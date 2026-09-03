# Backend Codex Prompt — Pizza Delivery Admin Web API Contract

Implement the REST endpoints required by the existing Pizza Delivery Admin Web frontend. The backend is the source of truth for authentication, RBAC, permissions, restaurant tenancy, validation, pricing, and all business rules. Do not trust frontend role or permission checks.

## Technical and transport requirements

- Node.js, TypeScript, Fastify, PostgreSQL, Prisma.
- Base path: `/api/v1`.
- JSON for every request and response.
- Web requests send `X-Client-Type: web` and credentials.
- Web refresh token must be set only as an HttpOnly, Secure, SameSite cookie. The frontend must never receive or read it from JSON, localStorage, sessionStorage, or JavaScript.
- Access tokens are returned in login/refresh JSON and are short-lived. The frontend keeps them in memory and sends `Authorization: Bearer <accessToken>`.
- Use the existing authentication/RBAC/restaurant-membership implementation; do not create a second authorization system.

## Response envelope

Successful responses must use:

```json
{ "success": true, "data": {} }
```

Errors must use HTTP status codes and this exact shape:

```json
{
  "success": false,
  "error": {
    "code": "MACHINE_READABLE_CODE",
    "message": "Human-readable message",
    "details": {},
    "requestId": "req-123"
  }
}
```

Never make the web client parse `message` to determine behavior. At minimum support: `VALIDATION_ERROR` (400), `AUTHENTICATION_REQUIRED` (401), `TOKEN_EXPIRED` (401), `INVALID_CREDENTIALS` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `CONFLICT` (409), and `INTERNAL_ERROR` (500).

## Authentication endpoints

### `POST /auth/login`

Request:

```json
{ "email": "superadmin@example.com", "password": "secret", "rememberMe": false }
```

Response `200`:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "Super Admin",
      "email": "superadmin@example.com",
      "phone": null,
      "role": "SUPER_ADMIN",
      "isActive": true
    },
    "accessToken": "jwt",
    "expiresIn": "15m"
  }
}
```

Set/rotate the web refresh cookie in this response. Do not include the refresh token in the response body.

### `POST /auth/refresh`

No request body. Read the HttpOnly refresh cookie, rotate it, revoke the previous token, and return the same `data` shape as login. Return `TOKEN_EXPIRED` or `AUTHENTICATION_REQUIRED` without repeatedly rotating invalid sessions.

### `POST /auth/logout`

No request body. Revoke the refresh session, clear the refresh cookie, and return `{ "success": true, "data": null }`. Logout should be idempotent.

### `GET /auth/me`

Require a valid access token. Return the current user plus authorization data:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Super Admin",
    "email": "superadmin@example.com",
    "phone": null,
    "role": "SUPER_ADMIN",
    "isActive": true,
    "permissions": ["restaurants.read", "restaurants.create"],
    "memberships": []
  }
}
```

Memberships must include `restaurantId`, `restaurantName`, `role`, and `permissions`. Never return passwords, password hashes, refresh tokens, or sensitive session data.

## Dashboard endpoint

### `GET /dashboard/overview`

Optional query parameters: `restaurantId`, `from` (ISO date), `to` (ISO date). Validate that the caller may access `restaurantId`.

Return:

```json
{
  "success": true,
  "data": {
    "orders": { "value": 0, "changePercent": 0 },
    "revenue": { "value": 0, "currency": "PKR", "changePercent": 0 },
    "restaurants": { "value": 0, "active": 0 },
    "customers": { "value": 0, "changePercent": 0 },
    "orderVolume": [{ "label": "09:00", "value": 0 }],
    "recentActivity": [
      { "id": "uuid", "type": "ORDER", "message": "", "createdAt": "ISO-8601" }
    ]
  }
}
```

## Restaurant endpoints

Require permissions: `restaurants.read` for reads, `restaurants.create` for create, `restaurants.update` for updates, and `restaurants.status.update` for status changes. `SUPER_ADMIN` can access all restaurants; other roles must pass membership/tenant checks.

### `GET /restaurants`

Query parameters: `page`, `pageSize`, `search`, `status` (`ACTIVE|INACTIVE|SUSPENDED`), `sortBy` (`createdAt|name`), and `sortOrder` (`asc|desc`). Return:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Pizza House",
        "slug": "pizza-house",
        "cuisine": "Pizza & Italian",
        "phone": "+92...",
        "email": "orders@example.com",
        "supportContact": "Ali Khan",
        "address": "...",
        "city": "Lahore",
        "postalCode": "54000",
        "currency": "PKR",
        "taxRate": 16,
        "deliveryRadius": 8,
        "autoAccept": true,
        "status": "ACTIVE",
        "createdAt": "ISO-8601",
        "updatedAt": "ISO-8601"
      }
    ],
    "pagination": { "page": 1, "pageSize": 20, "total": 1, "totalPages": 1 }
  }
}
```

### `GET /restaurants/:id`

Return the restaurant object above. Return `NOT_FOUND` without leaking whether an inaccessible restaurant exists.

### `POST /restaurants`

Require `restaurants.create`. Request:

```json
{
  "name": "Northside Gourmet Pizza",
  "slug": "northside-pizza",
  "cuisine": "Pizza & Italian",
  "phone": "+92 300 1234567",
  "email": "orders@northside.com",
  "supportContact": "Ali Khan",
  "address": "Shop 4, Commercial Sector C",
  "city": "Lahore, DHA Phase 6",
  "postalCode": "54000",
  "currency": "PKR",
  "taxRate": 16,
  "deliveryRadius": 8,
  "autoAccept": true
}
```

Validate slug uniqueness, numeric ranges, supported currency, email/phone formats, and all required fields. Return the created restaurant using the standard envelope.

### `PATCH /restaurants/:id`

Require `restaurants.update`. Accept any supported editable subset of the create fields. Return the updated restaurant.

### `PATCH /restaurants/:id/status`

Require `restaurants.status.update`. Request `{ "status": "ACTIVE|INACTIVE|SUSPENDED" }`. Enforce valid state transitions and return the updated restaurant.

## Administration endpoints

Use the existing user, role, permission, invitation, and membership models. Require `administrations.read` to list/get, `administrations.invite` to invite, `administrations.update` to update permissions, and `administrations.status.update` to suspend/reactivate. Never allow a user to grant permissions they do not possess.

### `GET /administrations`

Query parameters: `page`, `pageSize`, `search`, `role`, `status`, and `restaurantId`. Return paginated administrator objects:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Ali Khan",
        "email": "ali@example.com",
        "phone": "+92...",
        "role": "RESTAURANT_ADMIN",
        "permissions": ["orders.read"],
        "restaurantIds": ["restaurant-uuid"],
        "status": "ACTIVE",
        "lastLoginAt": "ISO-8601",
        "createdAt": "ISO-8601",
        "updatedAt": "ISO-8601"
      }
    ],
    "pagination": { "page": 1, "pageSize": 20, "total": 1, "totalPages": 1 }
  }
}
```

### `GET /administrations/:id`

Return one administrator with the same shape. Apply the same tenancy checks as list.

### `POST /administrations/invitations`

Require `administrations.invite`. Request:

```json
{
  "firstName": "Ali",
  "lastName": "Khan",
  "email": "ali@example.com",
  "phone": "+92 300 1234567",
  "role": "RESTAURANT_ADMIN",
  "restaurantIds": ["restaurant-uuid"],
  "permissions": ["orders.read"]
}
```

Create a single-use, expiring invitation, send the email through the backend, and return the pending administrator record. Never return the raw invitation token in this API response.

### `PATCH /administrations/:id`

Require `administrations.update`. Accept `{ role?, restaurantIds?, permissions? }`, validate role/permission compatibility and tenancy, audit the change, and return the updated administrator.

### `PATCH /administrations/:id/status`

Require `administrations.status.update`. Request `{ "status": "ACTIVE|SUSPENDED" }`. Revoke active sessions when suspending and return the updated administrator.

## Audit and security requirements

- Enforce permissions on every endpoint, regardless of frontend visibility.
- Enforce restaurant membership on every restaurant-scoped query and mutation.
- Use parameterized Prisma queries and validate all input at the route boundary.
- Add audit records for restaurant status changes, invitations, permission changes, and administrator status changes.
- Add consistent request IDs to logs and error responses.
- Add tests for authentication, refresh rotation/replay prevention, RBAC, tenant isolation, validation, pagination, and not-found behavior.
- Document the final routes and any intentional naming differences in the backend README/OpenAPI specification.

Implement these endpoints first and provide example curl requests/responses. Do not implement menu, orders, customers, coupons, reports, payments, or delivery tracking in this phase.
