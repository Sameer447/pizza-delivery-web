# Backend Codex Prompt: Categories and Menu APIs

Implement the REST API required by the Pizza Delivery Admin Web categories and menu screens. The backend is the source of truth for authentication, RBAC, restaurant tenancy, validation, pricing, ordering, and deletion rules.

## Conventions

- Base URL: `/api/v1`
- Authenticate every endpoint with `Authorization: Bearer <accessToken>`.
- Require `X-Client-Type: web` for the web client where the existing auth contract supports it.
- Every restaurant-scoped request must validate that the authenticated user can access the requested `restaurantId`; never trust a restaurant ID from the browser.
- Use the existing response envelope:

```json
{ "success": true, "data": {} }
```

Errors must be:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "requestId": "req-123",
    "details": {}
  }
}
```

Use stable machine-readable `error.code` values. Do not make the frontend parse messages.

## Shared types

Use UUIDs and ISO-8601 timestamps. Money must be represented as integer minor units plus an ISO currency code, or as the existing project money type consistently. Do not use floating-point values for persisted prices.

```ts
type CategoryStatus = "ACTIVE" | "INACTIVE";
type MenuItemStatus = "ACTIVE" | "UNAVAILABLE" | "DRAFT";

type Category = {
  id: string;
  restaurantId: string;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  status: CategoryStatus;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
};

type MenuSize = {
  id: string;
  name: string;
  diameterInches: number | null;
  slices: number | null;
  servingDescription: string | null;
  priceMinor: number;
  currency: string;
  isAvailable: boolean;
  displayOrder: number;
};

type MenuItem = {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string | null;
  status: MenuItemStatus;
  imageUrl: string | null;
  prepTimeMinutes: number;
  kitchenStation: string | null;
  sku: string | null;
  ingredients: string[];
  allergens: string[];
  sauceBase: string | null;
  cheeseBlend: string | null;
  doughType: string | null;
  specialInstructions: string | null;
  sizes: MenuSize[];
  startingPriceMinor: number | null;
  currency: string;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
};
```

## Category endpoints

### `GET /restaurants/:restaurantId/categories`

Permission: `categories.read`. Query parameters:

```text
page=1&pageSize=20&search=&status=ACTIVE|INACTIVE&sort=displayOrder|name|itemCount|updatedAt&direction=asc|desc
```

Response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "summary": { "total": 8, "active": 7, "inactive": 1, "menuItems": 48 },
    "pagination": { "page": 1, "pageSize": 20, "totalItems": 8, "totalPages": 1 }
  }
}
```

### `POST /restaurants/:restaurantId/categories`

Permission: `categories.create`.

```json
{
  "name": "Pizzas",
  "slug": "pizzas",
  "description": "Main course pizzas",
  "displayOrder": 1,
  "status": "ACTIVE"
}
```

Return `201` with `data.category`. Validate unique name/slug per restaurant and reject invalid order values.

### `GET /restaurants/:restaurantId/categories/:categoryId`

Permission: `categories.read`. Return `data.category` including item counts and a small `items` preview if supported.

### `PATCH /restaurants/:restaurantId/categories/:categoryId`

Permission: `categories.update`. Accept any supplied fields from the create body. Return the updated category.

### `POST /restaurants/:restaurantId/categories/:categoryId/status`

Permission: `categories.update`. Body:

```json
{ "status": "ACTIVE" }
```

Return the updated category. Use `CATEGORY_NOT_FOUND`, `CATEGORY_STATUS_INVALID`, and `CATEGORY_ACCESS_DENIED` error codes.

### `POST /restaurants/:restaurantId/categories/:categoryId/reorder`

Permission: `categories.update`. Body:

```json
{ "direction": "UP" }
```

Allowed directions: `UP`, `DOWN`. Atomically swap display order with the adjacent category and return the affected categories.

### `DELETE /restaurants/:restaurantId/categories/:categoryId`

Permission: `categories.delete`. If menu items are assigned, return `409` with code `CATEGORY_HAS_MENU_ITEMS` and:

```json
{ "itemCount": 24, "sampleItems": [{ "id": "uuid", "name": "Chicken Tikka", "status": "ACTIVE" }] }
```

Never silently delete or reassign menu items. Only delete an empty category.

## Menu endpoints

### `GET /restaurants/:restaurantId/menu-items`

Permission: `menu.read`. Query parameters:

```text
page=1&pageSize=20&search=&categoryId=&status=ACTIVE|UNAVAILABLE|DRAFT&sort=popular|name|price|updatedAt&direction=asc|desc
```

Response:

```json
{
  "success": true,
  "data": {
    "items": [],
    "summary": { "total": 24, "active": 21, "unavailable": 2, "draft": 1 },
    "pagination": { "page": 1, "pageSize": 20, "totalItems": 24, "totalPages": 2 }
  }
}
```

Include category, sizes, starting price, order count, status, image URL, and updated timestamp needed by the table. Search and filtering must happen server-side.

### `POST /restaurants/:restaurantId/menu-items`

Permission: `menu.create`. Body:

```json
{
  "name": "Chicken Tikka",
  "slug": "chicken-tikka",
  "categoryId": "category-uuid",
  "description": "Tandoori spiced chicken pizza",
  "status": "DRAFT",
  "imageUrl": null,
  "prepTimeMinutes": 15,
  "kitchenStation": "WOOD_FIRE_OVEN",
  "sku": "PZ-CHK-TIK-009",
  "ingredients": ["chicken", "mozzarella", "capsicum"],
  "allergens": ["DAIRY", "GLUTEN"],
  "sauceBase": "Signature Makhani Tomato Gravy",
  "cheeseBlend": "Mozzarella and paneer",
  "doughType": "Hand-tossed sourdough",
  "specialInstructions": "Bake at 380C for 4.5 minutes",
  "sizes": [
    { "name": "Small", "diameterInches": 8, "slices": 4, "servingDescription": "1-2 Persons", "priceMinor": 79900, "currency": "PKR", "isAvailable": true, "displayOrder": 1 }
  ]
}
```

Return `201` with `data.menuItem`. Validate category tenancy, unique SKU/slug per restaurant, at least one size, positive prices, valid status, and supported currency.

### `GET /restaurants/:restaurantId/menu-items/:menuItemId`

Permission: `menu.read`. Return `data.menuItem` with the complete size/pricing matrix, recipe fields, order count, and recent activity if available.

### `PATCH /restaurants/:restaurantId/menu-items/:menuItemId`

Permission: `menu.update`. Accept the create fields partially. If `sizes` is supplied, replace the complete size matrix atomically. Return the updated menu item.

### `POST /restaurants/:restaurantId/menu-items/:menuItemId/status`

Permission: `menu.update`. Body:

```json
{ "status": "UNAVAILABLE", "reason": "Ingredient temporarily unavailable" }
```

Allowed transitions: `DRAFT` to `ACTIVE`, `ACTIVE` to `UNAVAILABLE`, `UNAVAILABLE` to `ACTIVE`, and any valid transition approved by the business rules. Return the updated item.

### `POST /restaurants/:restaurantId/menu-items/:menuItemId/duplicate`

Permission: `menu.create`. Body:

```json
{ "name": "Chicken Tikka Copy", "slug": "chicken-tikka-copy" }
```

Copy configuration and sizes, default the duplicate to `DRAFT`, and return `201` with `data.menuItem`.

### `DELETE /restaurants/:restaurantId/menu-items/:menuItemId`

Permission: `menu.delete`. Return `204` for a successful delete, or `409` with `MENU_ITEM_USED_IN_ORDERS` if hard deletion is forbidden. Prefer archive/soft-delete if order history requires retention.

## Image upload

If uploads are supported, provide `POST /restaurants/:restaurantId/menu-items/:menuItemId/image` with `multipart/form-data`, field `image`. Enforce PNG/JPEG/WebP and a 10 MB limit. Return `{ "imageUrl": "..." }`. Otherwise document the approved storage upload flow and accept a validated `imageUrl` only from that flow.

## Required error codes

At minimum implement: `AUTHENTICATION_REQUIRED`, `FORBIDDEN`, `RESTAURANT_ACCESS_DENIED`, `VALIDATION_ERROR`, `CATEGORY_NOT_FOUND`, `CATEGORY_HAS_MENU_ITEMS`, `CATEGORY_NAME_CONFLICT`, `MENU_ITEM_NOT_FOUND`, `MENU_ITEM_NAME_CONFLICT`, `MENU_ITEM_SKU_CONFLICT`, `MENU_ITEM_USED_IN_ORDERS`, `MENU_ITEM_INVALID_STATUS`, `INVALID_PAGINATION`, and `RATE_LIMITED`.

Add integration tests for tenancy/IDOR prevention, permission enforcement, pagination/filtering, category reorder atomicity, category deletion with assigned items, menu price validation, duplicate defaults, status transitions, and soft-delete/order-history behavior.
