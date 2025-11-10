# Project Structure (FSD - Feature-Sliced Design)

This project follows the **Feature-Sliced Design (FSD)** architectural methodology.

## 📁 Structure Overview

```
src/
├── app/                    # Application layer
│   ├── App.js             # Main app component with providers
│   └── index.js           # Public API
│
├── screens/               # Screens layer
│   └── goals/             # Goals screen (slice)
│       ├── ui/            # UI segment
│       │   └── GoalsScreen.js
│       ├── model/         # Screen logic segment
│       │   └── useGoals.js
│       └── index.js       # Public API
│
├── widgets/               # Composite blocks layer
│   ├── goal-list/         # Goal list widget
│   │   ├── ui/
│   │   │   └── GoalList.js
│   │   └── index.js
│   └── add-goal-modal/    # Add goal modal widget
│       ├── ui/
│       │   └── AddGoalModal.js
│       └── index.js
│
├── features/              # User scenarios layer
│   └── goals/             # Goals domain
│       └── add-goal/      # Add goal feature
│           ├── ui/
│           │   └── AddGoalForm.js
│           └── index.js
│
├── entities/              # Business entities layer
│   └── goal/              # Goal entity
│       ├── model/
│       │   ├── goalModel.js        # Goal factory
│       │   ├── useGoalsStore.js    # Goals state & CRUD
│       │   ├── useSwipeAnimation.js
│       │   ├── useDeleteAnimation.js
│       │   └── index.js
│       ├── lib/
│       │   ├── constants.js
│       │   ├── utils/
│       │   │   ├── interpolations.js
│       │   │   └── swipeHelpers.js
│       │   └── index.js
│       ├── ui/
│       │   └── GoalItem/
│       │       ├── GoalItem.js
│       │       ├── components/
│       │       │   └── DeleteActionArea.js
│       │       └── index.js
│       └── index.js
│
└── shared/                # Shared layer
    ├── ui/                # Reusable UI components
    │   ├── Button/
    │   │   ├── Button.js
    │   │   └── index.js
    │   ├── Modal/
    │   │   ├── Modal.js
    │   │   └── index.js
    │   ├── Divider/
    │   │   ├── Divider.js
    │   │   └── index.js
    │   └── index.js
    ├── assets/            # Shared assets
    │   └── todo-background.png
    └── lib/               # Utilities and helpers
        ├── debounce.js
        ├── generateId.js
        └── index.js
```

## 🎯 Layer Responsibilities

### 1. **app/** - Application Initialization

- App entry point
- Global providers (SafeAreaProvider, SafeAreaView)
- Global styles and configuration

### 2. **screens/** - Application Screens

- Complete screen components
- Compose widgets and features
- Handle screen-level UI orchestration
- **Segments**:
  - `ui/` (screen components)
  - `model/` (UI state & orchestration logic)
- **Example**: `useGoals` manages modal state and delegates to entity layer

### 3. **widgets/** - Composite UI Blocks

- Large, independent UI blocks
- Combine multiple entities and features
- Self-contained, reusable across screens
- **Segments**: `ui/` (components), `model/` (optional - widget logic)
- **Examples**: `GoalList` (displays goals), `AddGoalModal` (modal composition)

### 4. **features/** - User Interactions

- Specific user actions/features
- Feature-level logic for interactions
- Can use entities
- **Segments**: `ui/` (components), `model/` (optional - feature logic), `api/` (optional)
- **Example**: `AddGoalForm` handles input and submission

### 5. **entities/** - Business Entities

- **Core business logic and state management**
- Data models and CRUD operations
- Entity-specific UI components
- Animation and behavior logic
- **Segments**:
  - `ui/` (entity components)
  - `model/` (business logic, state, hooks)
  - `lib/` (entity-specific utilities)
  - `api/` (optional - entity API)
- **Example**: `useGoalsStore` manages all goal state and operations

### 6. **shared/** - Reusable Infrastructure

- UI kit (buttons, modals, inputs, etc.)
- Utilities and helpers
- Hooks
- Constants and configuration
- Shared assets (images, fonts)
- **Segments**: `ui/`, `lib/`, `assets/`, `api/` (base client), `config/`

## 🔧 Segments (Internal Slice Structure)

Each slice (screen, widget, feature, entity) should use **standardized segments**:

```
slice-name/
├── ui/           # UI components (required)
├── model/        # Business logic, state (optional)
├── api/          # API calls (optional)
├── lib/          # Helper functions (optional)
├── config/       # Configuration (optional)
└── index.js      # Public API exports
```

### Examples:

**Screen with UI only:**

```
screens/goals/
├── ui/
│   └── GoalsScreen.js
└── index.js
```

**Feature with UI and logic:**

```
features/goals/add-goal/
├── ui/
│   └── AddGoalForm.js
├── model/
│   └── validation.js
└── index.js
```

**Entity with UI, model, and API:**

```
entities/goal/
├── ui/
│   └── GoalItem.js
├── model/
│   └── goalModel.js
├── api/
│   └── goalApi.js
└── index.js
```

## 📋 Import Rules

**Downward imports only** (from top to bottom):

```
app → screens → widgets → features → entities → shared
```

- ✅ `screens` can import from `widgets`, `features`, `entities`, `shared`
- ✅ `widgets` can import from `features`, `entities`, `shared`
- ✅ `features` can import from `entities`, `shared`
- ✅ `entities` can import from `shared`
- ❌ Lower layers CANNOT import from upper layers
- ❌ Modules on the same layer CANNOT import from each other

## 🚀 Adding New Features

### Example: Adding "Remove Goal" feature

1. Create feature structure:

```
src/features/remove-goal/
├── ui/
│   └── RemoveGoalButton.js
└── index.js
```

2. Export from index:

```javascript
export { RemoveGoalButton } from "./ui/RemoveGoalButton";
```

3. Use in upper layers (widgets/screens):

```javascript
import { RemoveGoalButton } from "../../features/remove-goal";
```

## 🏗️ Key Architectural Decisions

### ✅ **Entity Layer Owns Business Logic**

**`entities/goal/model/useGoalsStore.js`** manages all goal state and CRUD operations:

```javascript
const { goals, addGoal, deleteGoal, clearGoals } = useGoalsStore();
```

**Why?**

- Single source of truth for goal data
- Reusable across any screen/feature
- Easy to add persistence (AsyncStorage, API)
- Screen layer stays thin and focused on UI

### ✅ **Screen Layer = UI Orchestration**

**`screens/goals/model/useGoals.js`** manages only UI state:

```javascript
const useGoals = () => {
  const { goals, addGoal, ... } = useGoalsStore() // ← Uses entity
  const [modalVisible, setModalVisible] = useState(false) // ← UI state

  // Orchestrates UI interactions
  const handleOnAddGoal = (text) => {
    if (!text.trim()) return // Validation
    addGoal(text) // Delegates to entity
    closeModal() // UI state
  }
}
```

### ✅ **Shared UI Design System**

**Button component** with variants:

```javascript
<Button variant="primary">Add Goal</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Clear Goals</Button>
```

**Modal compound component**:

```javascript
<Modal visible={visible} onClose={onClose}>
  <Modal.Header>...</Modal.Header>
  <Modal.Content>...</Modal.Content>
</Modal>
```

### ✅ **Domain-Grouped Features**

Features grouped by domain:

```
features/goals/
  ├── add-goal/
  └── (future: edit-goal/, filter-goals/, etc.)
```

### ✅ **Animation in Entity Layer**

Complex swipe-to-delete animation logic lives in entity:

- `useSwipeAnimation` - PanResponder logic
- `useDeleteAnimation` - Delete animation
- `lib/utils/` - Pure utility functions

**Why?**

- Entity behavior, not screen behavior
- Reusable if GoalItem appears elsewhere
- Pure functions are easily testable

## 🎨 Benefits of This Structure

- **Scalability**: Easy to add new features without breaking existing code
- **Maintainability**: Clear separation of concerns
- **Testability**: Each layer can be tested independently
- **Reusability**: Components are organized by their purpose
- **Team collaboration**: Different team members can work on different features without conflicts
- **Type Safety**: Easy to add TypeScript layer by layer
- **Performance**: Entity logic optimized independently from UI
