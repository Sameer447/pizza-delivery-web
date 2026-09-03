# Backend Codex Prompt — Restaurant Dashboard and Settings APIs

Implement the APIs required by the restaurant-admin screens in `src/components/restaurant-dashboard/restaurant-dashboard-screen.tsx`. Keep the backend authoritative for restaurant membership, permissions, availability, order state, operating hours, delivery rules, and all business validation.

## Contract rules

- Base URL: `/api/v1`.
- All endpoints return `{ "success": true, "data": ... }` on success.
- Errors return the existing error envelope with a machine-readable `error.code`, `message`, `details`, and `requestId`.
- Require an access token on every endpoint below.
- Every endpoint is scoped by `restaurantId`; verify membership and permission server-side. Never trust the selected restaurant ID from the browser.
- Use `X-Client-Type: web`, existing RBAC, Prisma transactions where settings overlap, audit logs for mutations, and ISO-8601 timestamps.
- Use these permissions: `restaurant.dashboard.read`, `restaurant.profile.read`, `restaurant.profile.update`, `restaurant.settings.read`, `restaurant.settings.update`, `restaurant.availability.update`, and `restaurant.alerts.read` / `restaurant.alerts.resolve`.
- `SUPER_ADMIN` may access all restaurants. Restaurant admins/staff may access only memberships allowed by the existing tenancy rules.
- Do not expose internal database fields, secrets, or untrusted error stack traces.

## 1. Dashboard overview

### `GET /restaurants/:restaurantId/dashboard/overview`

Optional query: `from`, `to` as ISO-8601 dates. Return:

```json
{
  "success": true,
  "data": {
    "restaurant": { "id": "uuid", "name": "Pizza House", "slug": "pizza-house", "status": "ACTIVE", "currency": "PKR" },
    "ordersToday": 126,
    "revenueToday": 186450,
    "averageOrderValue": 1479,
    "activeCustomers": 48,
    "orderChangePercent": 12.4,
    "revenueChangePercent": 8.6,
    "averageOrderChangePercent": 3.2,
    "activeCustomerChangePercent": 6.1,
    "ordersRequiringAttention": [{ "id": "uuid", "itemCount": 3, "total": 2450, "status": "DELAYED", "createdAt": "ISO-8601" }],
    "recentOrders": [{ "id": "uuid", "status": "PREPARING", "total": 2450, "createdAt": "ISO-8601" }],
    "kitchenLoadPercent": 72
  }
}
```

Use real order/customer/revenue data and return zero-valued metrics, not errors, for a new restaurant. Do not allow one restaurant's data to appear in another restaurant's response.

## 2. Restaurant profile

Use the existing restaurant endpoints:

- `GET /restaurants/:restaurantId` — requires `restaurant.profile.read`.
- `PATCH /restaurants/:restaurantId` — requires `restaurant.profile.update`.

The patch accepts a validated subset of `name`, `slug`, `cuisine`, `phone`, `email`, `supportContact`, `address`, `city`, and `postalCode`. Return the complete updated restaurant object. Enforce slug uniqueness, supported formats, optimistic concurrency if available, and audit the change.

## 3. Operating hours and closures

### `GET /restaurants/:restaurantId/dashboard/settings/operating-hours`

Return:

```json
{
  "success": true,
  "data": {
    "weeklySchedule": [{
      "dayOfWeek": 1, "isOpen": true,
      "openingTime": "10:00", "closingTime": "23:00",
      "splitOpeningTime": null, "splitClosingTime": null
    }],
    "specialClosures": [{
      "id": "uuid", "title": "Staff training", "startsAt": "ISO-8601",
      "endsAt": "ISO-8601", "reason": "Annual training"
    }]
  }
}
```

### `PUT /restaurants/:restaurantId/dashboard/settings/operating-hours`

Accept the same `weeklySchedule` object and return the saved settings. Validate all seven days, valid `HH:mm` values, opening/closing order, split-period overlap, timezone handling, and authorization.

### `POST /restaurants/:restaurantId/dashboard/settings/closures`

Request:

```json
{ "title": "Christmas Day", "startsAt": "ISO-8601", "endsAt": "ISO-8601", "reason": "Holiday closure" }
```

Return the created closure. Reject invalid ranges and overlapping closures according to business rules.

### `DELETE /restaurants/:restaurantId/dashboard/settings/closures/:closureId`

Delete only a closure belonging to the selected restaurant. Return `{ "success": true, "data": null }` and audit the action.

## 4. Delivery settings

### `GET|PUT /restaurants/:restaurantId/dashboard/settings/delivery`

Response/request shape:

```json
{
  "enabled": true,
  "radiusKm": 8,
  "minimumOrderValue": 500,
  "deliveryFee": 150,
  "estimatedMinutes": 45,
  "instructions": "Call on arrival"
}
```

Validate non-negative numeric values, radius limits, currency precision, and consistency with delivery zones. Return the complete saved settings.

## 5. Pickup settings

### `GET|PUT /restaurants/:restaurantId/dashboard/settings/pickup`

Use:

```json
{
  "enabled": true,
  "instructions": "Collect from the front counter",
  "scheduledPickupEnabled": true,
  "estimatedMinutes": 20
}
```

Validate that scheduled pickup and estimated times follow restaurant policy.

## 6. Order settings

### `GET|PUT /restaurants/:restaurantId/dashboard/settings/orders`

Use:

```json
{
  "autoAccept": true,
  "minimumOrderValue": 500,
  "maximumOpenOrders": 25,
  "preparationTimeMinutes": 30,
  "scheduledOrdersEnabled": true,
  "customerNotesEnabled": true,
  "modifiersEnabled": true
}
```

Validate thresholds and ensure changes do not bypass order/payment rules. Audit changes that affect order acceptance.

## 7. Notification settings

### `GET|PUT /restaurants/:restaurantId/dashboard/settings/notifications`

Use:

```json
{
  "orderEventsEnabled": true,
  "delayedOrderAlertsEnabled": true,
  "audioAlertsEnabled": true,
  "dispatchEmail": "orders@pizzahouse.pk",
  "dispatchPhone": "+92 42 35879011"
}
```

Validate contact channels and do not send test notifications from a settings save unless explicitly requested by a separate endpoint.

## 8. Availability and temporary pause

### `GET /restaurants/:restaurantId/dashboard/settings/availability`

Return:

```json
{
  "success": true,
  "data": {
    "status": "ACTIVE",
    "pauseReason": null,
    "pausedUntil": null,
    "customerMessage": null,
    "upcomingClosures": []
  }
}
```

### `PATCH /restaurants/:restaurantId/dashboard/settings/availability`

Request:

```json
{
  "status": "INACTIVE",
  "pauseReason": "Experiencing extreme volume",
  "pausedUntil": "ISO-8601",
  "customerMessage": "We will be back shortly."
}
```

Validate allowed transitions, require a reason for a pause when policy requires one, persist the customer-facing message, and immediately prevent new orders when paused. Return the updated availability object. Reopening must not silently delete scheduled closures.

## 9. Operational alerts

### `GET /restaurants/:restaurantId/dashboard/alerts`

Optional query: `resolved=true|false`. Return an array of:

```json
{
  "success": true,
  "data": [{
    "id": "uuid", "type": "DELAYED_ORDER", "severity": "WARNING",
    "title": "Delayed order", "message": "Order is overdue",
    "isResolved": false, "createdAt": "ISO-8601"
  }]
}
```

### `POST /restaurants/:restaurantId/dashboard/alerts/:alertId/resolve`

Resolve one alert belonging to the restaurant, record who resolved it and when, and return the updated alert. Do not allow resolving alerts for another restaurant.

## Error and test requirements

Use existing machine-readable codes, including `VALIDATION_ERROR`, `AUTHENTICATION_REQUIRED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `INVALID_SETTINGS`, and `RESTAURANT_PAUSED`. Add tests for tenant isolation, role/permission checks, malformed settings, overlapping hours/closures, pause/reopen behavior, alert ownership, and dashboard aggregation. Update OpenAPI and backend README with the final contract and curl examples.

Do not implement menu, customer, coupon, payment, delivery tracking, or unrelated order-management UI in this task.
