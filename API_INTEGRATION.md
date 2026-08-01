# 🗺️ API Integration Mapping

## 👑 Admin Dashboard Operations

| Frontend Page & Event | Backend Route & Method | Role Access | Purpose |
| :--- | :--- | :--- | :--- |
| **All Users List** <br> `/admin-dashboard/all-users` | `GET` <br> `/api/admin/users` | `ADMIN` | View all system users |
| **Block/Unblock Switch** <br> Toggle action | `PATCH` <br> `/api/admin/users/:id` | `ADMIN` | Change user status |
| **All Properties Page** <br> `/admin-dashboard/all-properties` | `GET` <br> `/api/admin/properties` | `ADMIN` | Monitor all platform properties |
| **All Requests Page** <br> `/admin-dashboard/all-rental-request` | `GET` <br> `/api/admin/rentals` | `ADMIN` | View all platform rental requests |
| **Add Category Form** <br> `/admin-dashboard/category` | `POST` <br> `/api/admin/category` | `ADMIN` | Add a new property category |

## 🛠️ Landlord Dashboard Operations

| Frontend Page & Event | Backend Route & Method | Role Access | Purpose |
| :--- | :--- | :--- | :--- |
| **Create Post Form** <br> `/landlord-dashboard/my-posts` | `POST` <br> `/api/landlord/properties` | `LANDLORD` | Create a new property post |
| **My Posts List** <br> View listings grid | `GET` <br> `/api/landlord/properties` | `LANDLORD`<br>`ADMIN` | View all posts owned by landlord |
| **Post Details View** <br> Specific post page | `GET` <br> `/api/landlord/:postId` | `LANDLORD`<br>`ADMIN` | View specific post by ID |
| **Edit Post Form** <br> Save changes button | `PUT` <br> `/api/landlord/:postId` | `LANDLORD` | Update property details |
| **Delete Button** <br> Remove post | `DELETE` <br> `/api/landlord/:postId` | `LANDLORD`<br>`ADMIN` | Remove a property listing |
| **Requests List** <br> `/landlord-dashboard/rental-request` | `GET` <br> `/api/landlord/requests` | `LANDLORD` | See rental requests on owned posts |
| **Status Actions** <br> Accept / Reject buttons | `PATCH` <br> `/api/landlord/:id` | `LANDLORD` | Change request status |

## 👟 Tenant Dashboard & Public Listings

| Frontend Page & Event | Backend Route & Method | Role Access | Purpose |
| :--- | :--- | :--- | :--- |
| **Public Listings** <br> `/posts` | `GET` <br> `/api/public/properties` | `Public` | View all active property listings |
| **Property Details** <br> `/posts/[id]` | `GET` <br> `/api/public/properties/:id` | `Public` | View detailed information of a post |
| **Category Filters** <br> Filter buttons | `GET` <br> `/api/public/categories` | `Public` | Fetch available property categories |
| **Send Request** <br> Submit button on `/posts/[id]` | `POST` <br> `/api/rentals` | `TENANT` | Send a rental request for a property |
| **My Requests List** <br> `/tenant-dashboard/rental-request` | `GET` <br> `/api/rentals` | `TENANT` | View all rental requests sent by tenant |
| **Request Details** <br> Expanded single item view | `GET` <br> `/api/rentals/:id` | `TENANT` | View details of a specific request |
| **Checkout Form** <br> Payment submission | `POST` <br> `/api/payments/create/:id` | `TENANT` | Process payment for accepted property |
| **Review Form** <br> Submit post-payment rating | `POST` <br> `/api/reviews` | `TENANT` | Leave a review after payment |
| **Payment Logs** <br> `/tenant-dashboard/payment-history` | `GET` <br> `/api/payments` | `TENANT` | View history of all past payments |
| **Invoice Page** <br> Single receipt view | `GET` <br> `/api/payments/:id` | `TENANT`<br>`ADMIN` | View single transaction item breakdown |

## 🔑 Profile & Identity Control

| Frontend Page & Event | Backend Route & Method | Role Access | Purpose |
| :--- | :--- | :--- | :--- |
| **Register Page** <br> `/register` | `POST` <br> `/api/users/register` | `Public` | Register a new user account |
| **Login Page** <br> `/login` | `POST` <br> `/api/auth/login` | `Public` | Authenticate user and issue JWTs |
| **Token Refresh** <br> Automatic interceptor trigger | `POST` <br> `/api/auth/refresh-token` | `Public` | Automatically renew expired AccessToken |
| **Profile Page** <br> `/profile` | `GET` <br> `/api/users/me` | `TENANT`<br>`LANDLORD`<br>`ADMIN` | Fetch current user's profile |
| **Edit Profile Form** <br> Update fields | `PUT` <br> `/api/users/my-profile` | `TENANT`<br>`LANDLORD`<br>`ADMIN` | Update user profile details |
