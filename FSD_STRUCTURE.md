# FSD Structure - Visual Guide

## 🏗️ Your Current Project Structure

```
my-native-cours-app/
│
├── App.js                              # ← Entry point (imports from src/app)
│
└── src/
    │
    ├── 📱 app/                         # Layer 1: Application
    │   ├── App.js                      # Main app wrapper with providers
    │   └── index.js                    # Public exports
    │
    ├── 📱 screens/                     # Layer 2: Screens
    │   └── goals/
    │       ├── ui/
    │       │   └── GoalsScreen.js      # Complete goals screen
    │       ├── model/
    │       │   └── useGoals.js         # Screen UI orchestration logic
    │       └── index.js
    │
    ├── 🧩 widgets/                     # Layer 3: Composite Blocks
    │   ├── goal-list/
    │   │   ├── ui/
    │   │   │   └── GoalList.js         # List of goals widget
    │   │   └── index.js
    │   └── add-goal-modal/
    │       ├── ui/
    │       │   └── AddGoalModal.js     # Add goal modal composition
    │       └── index.js
    │
    ├── ⚡ features/                    # Layer 4: User Actions
    │   └── goals/
    │       └── add-goal/
    │           ├── ui/
    │           │   └── AddGoalForm.js  # Add goal form feature
    │           └── index.js
    │
    ├── 🎯 entities/                    # Layer 5: Business Entities
    │   └── goal/
    │       ├── model/
    │       │   ├── goalModel.js        # Goal factory function
    │       │   ├── useGoalsStore.js    # Goals state & CRUD operations
    │       │   ├── useSwipeAnimation.js # Swipe gesture logic
    │       │   ├── useDeleteAnimation.js # Delete animation logic
    │       │   └── index.js
    │       ├── lib/
    │       │   ├── constants.js        # Goal-related constants
    │       │   ├── utils/
    │       │   │   ├── interpolations.js # Animation interpolations
    │       │   │   └── swipeHelpers.js   # Swipe utility functions
    │       │   └── index.js
    │       ├── ui/
    │       │   └── GoalItem/
    │       │       ├── GoalItem.js     # Single goal display with swipe
    │       │       ├── components/
    │       │       │   └── DeleteActionArea.js
    │       │       └── index.js
    │       └── index.js
    │
    └── 🔧 shared/                      # Layer 6: Infrastructure
        ├── ui/                         # Reusable UI components
        │   ├── Button/
        │   │   ├── Button.js           # Custom button component
        │   │   └── index.js
        │   ├── Modal/
        │   │   ├── Modal.js            # Modal compound component
        │   │   └── index.js
        │   ├── Divider/
        │   │   ├── Divider.js
        │   │   └── index.js
        │   └── index.js
        ├── assets/                     # Shared assets
        │   └── todo-background.png
        └── lib/                        # Utilities
            ├── debounce.js
            ├── generateId.js
            └── index.js
```

## 🔄 Component Flow

```
┌─────────────────────────────────────────────────────┐
│                    App.js (root)                     │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              app/App.js (providers)                  │
│  • SafeAreaProvider                                  │
│  • SafeAreaView                                      │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│       screens/goals/GoalsScreen.js + useGoals()      │
│  • UI orchestration (modal state)                    │
│  • Coordinates widgets + features                    │
│  • Uses: useGoalsStore (entity)                      │
└────────┬──────────────────┬──────────────┬──────────┘
         │                  │              │
    ┌────▼────┐      ┌──────▼──────┐  ┌───▼───────┐
    │ Widget  │      │   Widget    │  │  Feature  │
    └────┬────┘      └──────┬──────┘  └───┬───────┘
         │                  │              │
         ▼                  ▼              ▼
┌────────────────┐  ┌──────────────┐  ┌──────────────┐
│  AddGoalModal  │  │  GoalList    │  │  Button      │
│  (widget)      │  │  (widget)    │  │  (shared)    │
└────────┬───────┘  └──────┬───────┘  └──────────────┘
         │                 │
         ▼                 ▼
┌────────────────┐  ┌──────────────┐
│ AddGoalForm    │  │  GoalItem    │
│ (feature)      │  │  (entity)    │
└────────────────┘  └──────┬───────┘
                           │
                    ┌──────▼────────────┐
                    │ Animation Hooks   │
                    │ • useSwipeAnim    │
                    │ • useDeleteAnim   │
                    └───────────────────┘
```

## 📦 What Each Layer Contains Now

### 1. **app/** - Application Setup

```javascript
// Provides app-wide context and layout
<SafeAreaProvider>
  <SafeAreaView>
    <GoalsScreen />
  </SafeAreaView>
</SafeAreaProvider>
```

### 2. **screens/goals/** - Goals Screen

**UI** (`ui/GoalsScreen.js`):

- Renders widgets (AddGoalModal, GoalList)
- Renders features (shared Button)
- Coordinates layout

**Model** (`model/useGoals.js`):

- Uses `useGoalsStore` for data operations
- Manages modal visibility (UI state)
- Validates input before adding goals
- Thin orchestration layer

### 3. **widgets/** - Composite UI Blocks

**goal-list** (`widgets/goal-list/`):

- Displays array of goals
- Maps over goals and renders GoalItem
- Manages scroll state during swipe
- Shows background image

**add-goal-modal** (`widgets/add-goal-modal/`):

- Composes Modal + AddGoalForm
- Self-contained modal structure
- Manages modal title and layout

### 4. **features/goals/** - User Actions

**add-goal** (`features/goals/add-goal/`):

- TextInput for goal text
- Custom buttons (Cancel, Add Goal)
- Input focus state
- Form validation

### 5. **entities/goal/** - Goal Entity

**Model** (`model/`):

- `goalModel.js`: Factory function for creating goals
- `useGoalsStore.js`: **Goals state & CRUD operations** (add, delete, clear)
- `useSwipeAnimation.js`: Swipe gesture logic with PanResponder
- `useDeleteAnimation.js`: Delete animation logic

**Lib** (`lib/`):

- `constants.js`: Colors, dimensions, animation constants
- `utils/interpolations.js`: Animation interpolation helpers
- `utils/swipeHelpers.js`: Swipe utility functions

**UI** (`ui/GoalItem/`):

- `GoalItem.js`: Displays single goal with swipe-to-delete
- `components/DeleteActionArea.js`: Delete button with animation

### 6. **shared/** - Reusable Code

**UI** (`ui/`):

- `Button`: Custom button with variants (primary, secondary, danger)
- `Modal`: Compound component for modals (Header, Content, Footer)
- `Divider`: Simple divider component

**Assets** (`assets/`):

- `todo-background.png`: Shared background image

**Lib** (`lib/`):

- `debounce.js`: Debounce utility
- `generateId.js`: UUID generation

## 🎯 Key Benefits You Get

1. **Clear Ownership**: Each file has a single responsibility
2. **Easy Navigation**: Know exactly where to find/add code
3. **Scalability**: Add new features without touching existing code
4. **Testability**: Test each layer independently
5. **Team Work**: Multiple developers can work without conflicts

## 🎯 Key Architectural Decisions

### ✅ Entity Layer Owns Business Logic

- **`useGoalsStore`** in `entities/goal/model/` manages all goal state and CRUD
- Screen layer just orchestrates UI state (modal visibility)
- Makes testing and reusability easier

### ✅ Shared UI Components

- **Button** with variants (primary, secondary, danger)
- **Modal** as compound component
- Used across features for consistency

### ✅ Swipe-to-Delete Implementation

- Animation logic in entity layer (`useSwipeAnimation`, `useDeleteAnimation`)
- Pure utility functions in `lib/` for reusability
- Uses React Native `Animated` API with `PanResponder`

### ✅ Widget Composition

- **AddGoalModal** composes shared Modal + feature AddGoalForm
- **GoalList** manages scroll behavior during swipe
- Self-contained, reusable blocks

## 🚀 Next Steps

### Want to add goal persistence?

1. Create: `src/entities/goal/api/goalApi.js`
2. Add: `src/shared/lib/storage.js` for AsyncStorage
3. Update `useGoalsStore` to use API calls
4. Screen layer code stays unchanged!

### Want to add goal categories?

1. Create: `src/entities/category/` (new entity)
2. Update: `src/entities/goal/model/goalModel.js` to include categoryId
3. Create: `src/features/goals/select-category/` (new feature)
4. Compose in: `widgets/add-goal-modal/`

### Want to add goal editing?

1. Create: `src/features/goals/edit-goal/` (new feature)
2. Add `updateGoal` to `useGoalsStore`
3. Use in existing widgets

The structure scales with your needs! 🎉
