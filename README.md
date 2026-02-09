Note app for parctise

## 📂 Naming Conventions

To maintain a clean and predictable codebase, we follow a strict naming convention for all files. This allows developers to identify the "job" of a file at a glance.

### 1. Filenames (Dot Notation)
All files must follow the `[name].[job].js` pattern using **kebab-case** for the name portion.

| File Type    | Convention                | Example                |
| :----------- | :------------------------ | :--------------------- |
| Controller   | `[name].controller.js`    | `user-auth.controller.js` |
| Middleware   | `[name].middleware.js`    | `is-admin.middleware.js`  |
| Service/Logic| `[name].service.js`       | `payment.service.js`     |
| Data Model   | `[name].model.js`         | `order.model.js`         |
| Utility      | `[name].util.js`          | `date-formatter.util.js` |

### 2. Directory Structure
We use a **Layered Architecture**. Files are grouped by their functional role:

```text
src/
├── controllers/    # Route handlers & request parsing
├── middleware/     # Auth, validation, & logging guards
├── services/       # Business logic & database calls
├── models/         # Schema definitions (Mongoose/Sequelize)
└── utils/          # Helper functions
