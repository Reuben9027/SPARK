<template>
  <v-app>
    <!-- Navigation Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      variant
      @click="rail = false"
    >
      <v-list-item
        class="pa-4"
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      >
        <template v-slot:subtitle>
          John Meyer <span>Level {{ userLevel }}</span>
        </template>
        <template v-slot:title>
          <v-sheet
            class="d-flex align-center px-0 py-0 mx-auto"
            color="#181a1b"
            rounded="lg"
          >
            <v-progress-linear
              :location="null"
              buffer-opacity="1"
              buffer-value="3"
              height="12"
              max="9"
              min="0"
              :model-value="levelProgress"
              rounded
            ></v-progress-linear>
          </v-sheet>
          <div class="text-caption text-center mt-1">
            {{ currentXP }} / {{ xpForNextLevel }} XP
          </div>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <template v-for="item in menuItems" :key="item.title">
          <!-- Main menu item -->
          <v-list-item
            :prepend-icon="item.icon"
            :title="rail ? '' : item.title"
            :value="item.title"
            @click="
              item.subItems
                ? toggleExpanded(item.title)
                : (currentView = item.view)
            "
            :class="{ 'active-menu-item': currentView === item.view }"
          >
            <template v-slot:append v-if="item.subItems && !rail">
              <v-icon
                :icon="
                  expandedItems.includes(item.title)
                    ? 'mdi-chevron-up'
                    : 'mdi-chevron-down'
                "
                size="small"
              ></v-icon>
            </template>
          </v-list-item>

          <!-- Submenu items -->
          <v-list
            v-if="item.subItems && expandedItems.includes(item.title)"
            density="compact"
            nav
            class="submenu"
          >
            <v-list-item
              v-for="subItem in item.subItems"
              :key="subItem.title"
              :prepend-icon="subItem.icon"
              :title="rail ? '' : subItem.title"
              :value="subItem.title"
              @click="currentView = subItem.view"
              :class="{
                'active-menu-item': currentView === subItem.view,
                'submenu-item': true,
              }"
              class="ml-4"
            ></v-list-item>
          </v-list>
        </template>

        <!-- Unfinished Projects Section -->
        <v-divider class="my-4"></v-divider>

        <v-list-item class="text-caption text-grey-darken-1 font-weight-medium">
          <template v-slot:prepend>
            <v-icon size="small" color="grey">mdi-folder-open</v-icon>
          </template>
          <span v-if="!rail">Ongoing Projects</span>
        </v-list-item>

        <template v-for="project in ongoingProjects" :key="project.id">
          <!-- Project menu item -->
          <v-list-item
            :prepend-icon="project.icon"
            :title="rail ? '' : project.title"
            :value="project.title"
            @click="toggleExpanded(project.title)"
            :class="{ 'active-menu-item': currentView === project.view }"
          >
            <template v-slot:append v-if="!rail">
              <div class="d-flex align-center">
                <v-progress-circular
                  :model-value="project.progress"
                  :color="getProgressColor(project.progress)"
                  size="20"
                  width="2"
                  class="mr-2"
                ></v-progress-circular>
                <v-icon
                  :icon="
                    expandedItems.includes(project.title)
                      ? 'mdi-chevron-up'
                      : 'mdi-chevron-down'
                  "
                  size="small"
                ></v-icon>
              </div>
            </template>
          </v-list-item>

          <!-- Project submenu items -->
          <v-list
            v-if="expandedItems.includes(project.title)"
            density="compact"
            nav
            class="submenu"
          >
            <v-list-item
              v-for="subItem in project.subItems"
              :key="subItem.title"
              :prepend-icon="subItem.icon"
              :title="rail ? '' : subItem.title"
              :value="subItem.title"
              @click="currentView = subItem.view"
              :class="{
                'active-menu-item': currentView === subItem.view,
                'submenu-item': true,
              }"
              class="ml-4"
            ></v-list-item>
          </v-list>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="admin-main">
      <!-- Top App Bar -->
      <v-app-bar>
        <v-app-bar-title class="text-h6 font-weight-medium">
          {{ getCurrentViewTitle() }}
        </v-app-bar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="toggleTheme">
          <v-icon>{{
            isDark ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent"
          }}</v-icon>
        </v-btn>
        <v-btn icon class="mr-2">
          <v-badge
            :content="notifications"
            :model-value="notifications > 0"
            color="error"
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </v-app-bar>

      <!-- Dashboard Content -->
      <v-container fluid class="admin-container">
        <!-- Dashboard Overview -->
        <div v-if="currentView === 'dashboard'" class="dashboard-overview">
          <v-card variant="outlined" class="pa-6">
            <v-card-title
              class="d-flex align-center justify-space-between mb-6"
            >
              <div>
                <span class="text-h4">Dashboard Overview</span>
                <p class="text-body-1 text-grey-darken-1 mt-2">
                  Track your progress and manage your projects efficiently
                </p>
              </div>
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                @click="addNewTodo"
                size="large"
              >
                Add Task
              </v-btn>
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12" md="8">
                  <v-card variant="outlined" class="pa-4 mb-4">
                    <v-card-title class="text-h6 mb-3">To-Do List</v-card-title>
                    <div v-if="todos.length === 0" class="text-center py-8">
                      <v-icon size="64" color="grey-lighten-1"
                        >mdi-clipboard-text-outline</v-icon
                      >
                      <p class="text-h6 text-grey mt-4">No tasks yet</p>
                      <p class="text-body-1 text-grey-darken-1">
                        Add your first task to get started
                      </p>
                    </div>

                    <div v-else class="todo-list">
                      <v-card
                        v-for="todo in todos"
                        :key="todo.id"
                        variant="outlined"
                        class="mb-3 task-card"
                        :class="{ 'completed-todo': todo.completed }"
                      >
                        <v-card-text class="py-3">
                          <div
                            class="d-flex align-center justify-space-between"
                          >
                            <div class="flex-grow-1">
                              <h4
                                class="text-h6 font-weight-bold mb-1"
                                :class="{
                                  'text-decoration-line-through text-grey':
                                    todo.completed,
                                }"
                              >
                                {{ todo.title }}
                              </h4>
                              <p
                                class="text-body-2 text-grey-darken-1 mb-2"
                                :class="{
                                  'text-decoration-line-through':
                                    todo.completed,
                                }"
                              >
                                {{ todo.details }}
                              </p>
                              <div class="d-flex align-center">
                                <v-chip
                                  :color="
                                    todo.priority === 'high'
                                      ? 'error'
                                      : todo.priority === 'medium'
                                      ? 'warning'
                                      : 'success'
                                  "
                                  size="small"
                                  class="mr-2"
                                >
                                  {{ todo.priority }}
                                </v-chip>
                                <span class="text-caption text-grey">
                                  {{ formatDate(todo.createdAt) }}
                                </span>
                              </div>
                            </div>

                            <div class="d-flex align-center">
                              <v-btn
                                :color="todo.completed ? 'success' : 'primary'"
                                :icon="
                                  todo.completed
                                    ? 'mdi-check-circle'
                                    : 'mdi-check'
                                "
                                variant="text"
                                size="small"
                                @click="toggleTodo(todo.id)"
                                class="mr-2"
                              ></v-btn>

                              <v-btn
                                color="error"
                                icon="mdi-delete"
                                variant="text"
                                size="small"
                                @click="deleteTodo(todo.id)"
                              ></v-btn>
                            </div>
                          </div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <!-- Todo Progress -->
                  <v-card variant="outlined" class="pa-4 mb-4">
                    <v-card-title class="text-h6 mb-3"
                      >Todo Progress</v-card-title
                    >
                    <div class="todo-progress-section">
                      <div
                        class="d-flex align-center justify-space-between mb-3"
                      >
                        <span class="text-body-2 font-weight-medium"
                          >Completion</span
                        >
                        <span class="text-body-2 text-grey"
                          >{{ todoCompletionPercentage }}%</span
                        >
                      </div>
                      <v-progress-linear
                        :model-value="todoCompletionPercentage"
                        :color="getTodoProgressColor(todoCompletionPercentage)"
                        height="12"
                        rounded
                        class="mb-3"
                      ></v-progress-linear>
                      <div
                        class="d-flex justify-space-between text-caption text-grey"
                      >
                        <span>{{ completedTodos }} completed</span>
                        <span>{{ totalTodos }} total</span>
                      </div>
                    </div>
                  </v-card>
                  <!-- Project Stats -->
                  <v-card variant="outlined" class="pa-4 mb-4">
                    <v-card-title class="text-h6 mb-3"
                      >Project Overview</v-card-title
                    >
                    <div class="stats-grid">
                      <div class="stat-item text-center mb-4">
                        <div class="text-h4 font-weight-bold text-primary mb-2">
                          1
                        </div>
                        <div class="text-caption text-grey">
                          <v-icon size="20" color="primary" class="mb-1"
                            >mdi-progress-clock</v-icon
                          >
                          Ongoing Projects
                        </div>
                      </div>
                      <div class="stat-item text-center mb-4">
                        <div class="text-h4 font-weight-bold text-success mb-2">
                          0
                        </div>
                        <div class="text-caption text-grey">
                          <v-icon size="20" color="success" class="mb-1"
                            >mdi-check-circle</v-icon
                          >
                          Completed Projects
                        </div>
                      </div>
                    </div>
                  </v-card>

                  <!-- Activity Streak -->
                  <v-card variant="outlined" class="pa-4 mb-4">
                    <v-card-title class="text-h6 mb-3"
                      >Activity Streak</v-card-title
                    >
                    <div class="text-center mb-3">
                      <div class="text-caption text-grey-darken-1">
                        Last 7 days
                      </div>
                    </div>

                    <div class="streak-grid mb-3">
                      <div
                        v-for="(day, index) in activityStreak"
                        :key="index"
                        class="streak-day"
                        :class="day.completed ? 'completed' : 'empty'"
                        :title="`${day.date}: ${
                          day.completed ? 'Completed tasks' : 'No activity'
                        }`"
                      ></div>
                    </div>

                    <div class="text-center">
                      <div class="text-h4 font-weight-bold text-primary mb-1">
                        {{ currentStreak }}
                      </div>
                      <div class="text-caption text-grey">day streak</div>
                    </div>
                  </v-card>

                  <!-- Quick Actions -->
                  <v-card variant="outlined" class="pa-4">
                    <v-card-title class="text-h6 mb-3"
                      >Quick Actions</v-card-title
                    >
                    <v-btn
                      color="primary"
                      variant="outlined"
                      block
                      prepend-icon="mdi-plus"
                      @click="addNewTodo"
                      class="mb-2"
                    >
                      Add New Task
                    </v-btn>
                    <v-btn
                      color="secondary"
                      variant="outlined"
                      block
                      prepend-icon="mdi-folder-plus"
                      @click="currentView = 'projectList'"
                      class="mb-2"
                    >
                      Create Project
                    </v-btn>
                    <v-btn
                      color="info"
                      variant="outlined"
                      block
                      prepend-icon="mdi-chart-line"
                      @click="currentView = 'project'"
                    >
                      View Analytics
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <div v-else-if="currentView === 'projectList'">
          <ProjectList />
        </div>

        <div v-else-if="currentView === 'project'">
          <Project />
        </div>

        <!-- Component views for ongoing projects -->
        <div v-else-if="currentView === 'Features'">
          <Features />
        </div>

        <div v-else-if="currentView === 'Business'">
          <Business />
        </div>
        <div v-else-if="currentView === 'Design'">
          <Design />
        </div>
        <div v-else-if="currentView === 'Techstack'">
          <Techstack />
        </div>

        <div v-else-if="currentView === 'Checklist'">
          <Checklist />
        </div>

        <!-- Account Settings -->
        <div v-else-if="currentView === 'account'">
          <AccountSettings />
        </div>
      </v-container>
    </v-main>

    <!-- Floating Chat Icon -->
    <div class="floating-chat-container">
      <v-btn
        v-if="!showChat"
        fab
        color="primary"
        size="x-large"
        class="floating-chat-btn"
        @click="toggleChat"
        :class="{ 'chat-open': showChat }"
        elevation="8"
      >
        <img
          v-if="!showChat"
          src="/assets/axy.png"
          alt="AI Assistant"
          class="chat-icon-image"
        />
      </v-btn>

      <!-- XP Notification -->
      <v-snackbar
        v-model="showXPNotification"
        :timeout="3000"
        color="success"
        location="top"
        class="xp-notification"
      >
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-star</v-icon>
          <span>{{ xpNotificationText }}</span>
        </div>
      </v-snackbar>

      <!-- Level Up Notification -->
      <v-snackbar
        v-model="showLevelUpNotification"
        :timeout="5000"
        color="primary"
        location="top"
        class="level-up-notification"
      >
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi-trophy</v-icon>
          <span>{{ levelUpNotificationText }}</span>
        </div>
      </v-snackbar>

      <!-- Chat Box -->
      <v-card
        v-show="showChat"
        class="chat-box"
        variant="outlined"
        elevation="12"
      >
        <v-card-title class="chat-header pa-4">
          <div class="d-flex align-center justify-space-between w-100">
            <div class="d-flex align-center">
              <v-avatar size="36" color="primary" class="mr-3">
                <v-icon size="20" color="white">mdi-robot</v-icon>
              </v-avatar>
              <div>
                <span class="text-h6 font-weight-medium">AI Assistant</span>
                <div class="text-caption text-grey-darken-1">
                  Online • Ready to help
                </div>
              </div>
            </div>
            <div class="d-flex align-center">
              <v-btn
                icon="mdi-minus"
                variant="text"
                size="small"
                @click="minimizeChat"
                class="mr-2"
              ></v-btn>
              <v-btn
                icon="mdi-dots-vertical"
                variant="text"
                size="small"
                @click="showChatMenu = !showChatMenu"
              ></v-btn>
            </div>
          </div>
        </v-card-title>

        <div class="chat-content">
          <v-card-text class="chat-messages pa-0" ref="chatMessagesRef">
            <div class="messages-container">
              <div
                v-for="message in chatMessages"
                :key="message.id"
                class="message-wrapper"
                :class="message.type"
              >
                <div class="message-bubble">
                  <div
                    class="message-avatar"
                    v-if="message.type === 'ai-message'"
                  >
                    <v-avatar size="28" color="primary">
                      <v-icon size="16" color="white">mdi-robot</v-icon>
                    </v-avatar>
                  </div>
                  <div class="message-content">
                    <div class="message-text">{{ message.text }}</div>
                    <div class="message-time">
                      {{ formatMessageTime(message.timestamp) }}
                    </div>
                  </div>
                  <div
                    class="message-avatar"
                    v-if="message.type === 'user-message'"
                  >
                    <v-avatar size="28" color="secondary">
                      <v-icon size="16" color="white">mdi-account</v-icon>
                    </v-avatar>
                  </div>
                </div>
              </div>

              <!-- Typing indicator -->
              <div v-if="isTyping" class="message-wrapper ai-message">
                <div class="message-bubble">
                  <div class="message-avatar">
                    <v-avatar size="28" color="primary">
                      <v-icon size="16" color="white">mdi-robot</v-icon>
                    </v-avatar>
                  </div>
                  <div class="message-content">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>

          <v-card-actions class="chat-input-container pa-4">
            <div class="input-wrapper">
              <v-text-field
                v-model="newMessage"
                placeholder="Type your message..."
                variant="outlined"
                density="compact"
                hide-details
                @keyup.enter="sendMessage"
                class="chat-input"
                :disabled="isTyping"
              >
                <template v-slot:append-inner>
                  <v-btn
                    color="primary"
                    icon="mdi-send"
                    @click="sendMessage"
                    :disabled="!newMessage.trim() || isTyping"
                    size="small"
                    variant="text"
                  ></v-btn>
                </template>
              </v-text-field>
            </div>
          </v-card-actions>
        </div>
      </v-card>

      <!-- Chat Menu -->
      <v-menu
        v-model="showChatMenu"
        :close-on-content-click="false"
        location="top"
        offset="10"
      >
        <v-card class="chat-menu" min-width="200">
          <v-list>
            <v-list-item @click="clearChat">
              <template v-slot:prepend>
                <v-icon>mdi-delete</v-icon>
              </template>
              <v-list-item-title>Clear Chat</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportChat">
              <template v-slot:prepend>
                <v-icon>mdi-download</v-icon>
              </template>
              <v-list-item-title>Export Chat</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openHelpDialog">
              <template v-slot:prepend>
                <v-icon>mdi-help-circle</v-icon>
              </template>
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";

// TypeScript interfaces
interface SubMenuItem {
  title: string;
  icon: string;
  view: string;
}

interface MenuItem {
  title: string;
  icon: string;
  view: string;
  subItems?: SubMenuItem[];
}

interface ProjectItem {
  id: number;
  title: string;
  icon: string;
  view: string;
  progress: number;
  subItems: SubMenuItem[];
}

interface ActivityDay {
  date: string;
  completed: boolean;
}

const route = useRoute();

// Navigation state
const drawer = ref(true);
const rail = ref(false);
const currentView = ref("dashboard");
const notifications = ref(3);
const expandedItems = ref<string[]>([]);

// XP and Leveling System
const currentXP = ref(125);
const userLevel = ref(1);

// Notification state
const showXPNotification = ref(false);
const showLevelUpNotification = ref(false);
const xpNotificationText = ref("");
const levelUpNotificationText = ref("");

// Calculate level and XP requirements
const xpForNextLevel = computed(() => {
  return userLevel.value * 100; // Each level requires level * 100 XP
});

const levelProgress = computed(() => {
  const xpInCurrentLevel = currentXP.value - (userLevel.value - 1) * 100;
  const xpNeededForLevel = xpForNextLevel.value - (userLevel.value - 1) * 100;
  return (xpInCurrentLevel / xpNeededForLevel) * 9; // Scale to 0-9 for progress bar
});

// XP rewards for different task priorities
const xpRewards: { [key: string]: number } = {
  high: 25,
  medium: 15,
  low: 10,
};

// Todo list data
const todos = ref([
  {
    id: 1,
    title: "Design Homepage Layout",
    details:
      "Create wireframes and mockups for the main landing page with modern UI elements",
    priority: "high",
    completed: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Implement User Authentication",
    details:
      "Set up login/signup functionality with JWT tokens and password hashing",
    priority: "medium",
    completed: false,
    createdAt: new Date("2024-01-16"),
  },
  {
    id: 3,
    title: "Database Schema Design",
    details:
      "Plan and create the database structure for user profiles and project data",
    priority: "high",
    completed: true,
    createdAt: new Date("2024-01-14"),
  },
  {
    id: 4,
    title: "API Documentation",
    details: "Write comprehensive API documentation using Swagger/OpenAPI",
    priority: "low",
    completed: false,
    createdAt: new Date("2024-01-17"),
  },
]);

// Activity streak data
const activityStreak = ref<ActivityDay[]>([
  { date: "Mon", completed: true },
  { date: "Tue", completed: true },
  { date: "Wed", completed: false },
  { date: "Thu", completed: true },
  { date: "Fri", completed: true },
  { date: "Sat", completed: false },
  { date: "Sun", completed: true },
]);

const currentStreak = computed(() => {
  let streak = 0;
  for (let i = activityStreak.value.length - 1; i >= 0; i--) {
    if (activityStreak.value[i].completed) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
});

// Todo progress computed properties
const completedTodos = computed(() => {
  return todos.value.filter((todo) => todo.completed).length;
});

const totalTodos = computed(() => {
  return todos.value.length;
});

const todoCompletionPercentage = computed(() => {
  const completed = completedTodos.value;
  const total = totalTodos.value;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
});

function getTodoProgressColor(percentage: number) {
  if (percentage < 30) return "error";
  if (percentage < 70) return "warning";
  return "success";
}

// Menu items with hierarchical structure
const menuItems = ref<MenuItem[]>([
  { title: "Dashboard", icon: "mdi-view-dashboard", view: "dashboard" },
  { title: "Project List", icon: "mdi-account-group", view: "projectList" },
]);

// Ongoing projects for sidebar
const ongoingProjects = ref<ProjectItem[]>([
  {
    id: 1,
    title: "AI Project Management System",
    icon: "mdi-robot",
    view: "project",
    progress: 65,
    subItems: [
      {
        title: "Features",
        icon: "mdi-file-document-edit",
        view: "Features",
      },
      {
        title: "Business",
        icon: "mdi-calendar-check",
        view: "Business",
      },
      {
        title: "Design",
        icon: "mdi-chart-pie",
        view: "Design",
      },
      {
        title: "Tech stack",
        icon: "mdi-file-document-edit",
        view: "Techstack",
      },
      {
        title: "Checklist",
        icon: "mdi-checkbox-marked-outline",
        view: "Checklist",
      },
    ],
  },
  {
    id: 2,
    title: "E-commerce Platform",
    icon: "mdi-shopping",
    view: "project-ecommerce",
    progress: 75,
    subItems: [
      {
        title: "Features",
        icon: "mdi-file-document-edit",
        view: "Features",
      },
      {
        title: "Business",
        icon: "mdi-calendar-check",
        view: "Business",
      },
      {
        title: "Design",
        icon: "mdi-chart-pie",
        view: "Design",
      },
      {
        title: "Tech stack",
        icon: "mdi-file-document-edit",
        view: "Techstack",
      },
      {
        title: "Checklist",
        icon: "mdi-checkbox-marked-outline",
        view: "Checklist",
      },
    ],
  },
  {
    id: 3,
    title: "Mobile Banking App",
    icon: "mdi-bank",
    view: "project-banking",
    progress: 45,
    subItems: [
      {
        title: "Features",
        icon: "mdi-file-document-edit",
        view: "Features",
      },
      {
        title: "Business",
        icon: "mdi-calendar-check",
        view: "Business",
      },
      {
        title: "Design",
        icon: "mdi-chart-pie",
        view: "Design",
      },
      {
        title: "Tech stack",
        icon: "mdi-file-document-edit",
        view: "Techstack",
      },
      {
        title: "Checklist",
        icon: "mdi-checkbox-marked-outline",
        view: "Checklist",
      },
    ],
  },
  {
    id: 4,
    title: "AI Chatbot Assistant",
    icon: "mdi-robot",
    view: "project-chatbot",
    progress: 30,
    subItems: [
      {
        title: "Features",
        icon: "mdi-file-document-edit",
        view: "Features",
      },
      {
        title: "Business",
        icon: "mdi-calendar-check",
        view: "Business",
      },
      {
        title: "Design",
        icon: "mdi-chart-pie",
        view: "Design",
      },
      {
        title: "Tech stack",
        icon: "mdi-file-document-edit",
        view: "Techstack",
      },
      {
        title: "Checklist",
        icon: "mdi-checkbox-marked-outline",
        view: "Checklist",
      },
    ],
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    icon: "mdi-chart-line",
    view: "project-social",
    progress: 60,
    subItems: [
      {
        title: "Features",
        icon: "mdi-file-document-edit",
        view: "Features",
      },
      {
        title: "Business",
        icon: "mdi-calendar-check",
        view: "Business",
      },
      {
        title: "Design",
        icon: "mdi-chart-pie",
        view: "Design",
      },
      {
        title: "Tech stack",
        icon: "mdi-file-document-edit",
        view: "Techstack",
      },
      {
        title: "Checklist",
        icon: "mdi-checkbox-marked-outline",
        view: "Checklist",
      },
    ],
  },
]);

const theme = useTheme();
const isDark = computed(() => theme.global.name.value === "dark");
function toggleTheme() {
  theme.global.name.value = isDark.value ? "light" : "dark";
}

// Titles for the current view
const getCurrentViewTitle = () => {
  // Check main menu items first
  const mainItem = menuItems.value.find(
    (item) => item.view === currentView.value
  );
  if (mainItem) return mainItem.title;

  // Check ongoing projects
  const project = ongoingProjects.value.find(
    (p) => p.view === currentView.value
  );
  if (project) return project.title;

  // Check submenu items in ongoing projects
  for (const project of ongoingProjects.value) {
    if (project.subItems) {
      const subItem = project.subItems.find(
        (subItem) => subItem.view === currentView.value
      );
      if (subItem) {
        return `${project.title} - ${subItem.title}`;
      }
    }
  }

  // Handle component views
  const componentTitles: { [key: string]: string } = {
    Features: "Features",
    Business: "Business",
    Design: "Design",
    Techstack: "Tech Stack",
    Checklist: "Checklist",
  };

  if (componentTitles[currentView.value]) {
    return componentTitles[currentView.value];
  }

  return "Dashboard";
};

function toggleExpanded(title: string) {
  if (expandedItems.value.includes(title)) {
    expandedItems.value = expandedItems.value.filter((item) => item !== title);
  } else {
    expandedItems.value.push(title);
  }
}

// Todo management methods
function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    const wasCompleted = todo.completed;
    todo.completed = !todo.completed;

    // Award XP when completing a task (not when uncompleting)
    if (todo.completed && !wasCompleted) {
      const xpGained = xpRewards[todo.priority as keyof typeof xpRewards] || 10;
      currentXP.value += xpGained;

      // Show XP notification
      xpNotificationText.value = `+${xpGained} XP gained!`;
      showXPNotification.value = true;

      // Check for level up
      const newLevel = Math.floor(currentXP.value / 100) + 1;
      if (newLevel > userLevel.value) {
        userLevel.value = newLevel;
        // Show level up notification
        levelUpNotificationText.value = `🎉 Level Up! You are now level ${userLevel.value}!`;
        showLevelUpNotification.value = true;
      }

      // Update activity streak when task is completed
      updateActivityStreak();
    }
  }
}

function updateActivityStreak() {
  // Get today's day of week (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Update today's activity
  const todayIndex = activityStreak.value.findIndex(
    (day) => day.date === dayNames[today]
  );
  if (todayIndex !== -1) {
    activityStreak.value[todayIndex].completed = true;
  }
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id);
}

function addNewTodo() {
  const newTodo = {
    id: Date.now(),
    title: "New Task",
    details: "Add task details here",
    priority: "medium",
    completed: false,
    createdAt: new Date(),
  };
  todos.value.unshift(newTodo);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getProgressColor(progress: number) {
  if (progress < 30) return "error";
  if (progress < 70) return "warning";
  return "success";
}

// Project-specific methods
function getProjectNameFromView(view: string) {
  if (view === "project") {
    return "AI Project Management System";
  }

  if (view.startsWith("project-")) {
    const projectName = view.replace("project-", "");
    const project = ongoingProjects.value.find((p) => p.view === view);
    return project
      ? project.title
      : projectName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
  }

  // Handle section views (e.g., ecommerce-features)
  const parts = view.split("-");
  if (parts.length >= 2) {
    const projectType = parts[0];
    const projectMap: { [key: string]: string } = {
      ecommerce: "E-commerce Platform",
      banking: "Mobile Banking App",
      chatbot: "AI Chatbot Assistant",
      social: "Social Media Dashboard",
    };
    return (
      projectMap[projectType] ||
      projectType.charAt(0).toUpperCase() + projectType.slice(1)
    );
  }

  return "Unknown Project";
}

function getProjectIcon(view: string) {
  if (view === "project") {
    return "mdi-robot";
  }

  if (view.startsWith("project-")) {
    const project = ongoingProjects.value.find((p) => p.view === view);
    return project ? project.icon : "mdi-folder";
  }

  // Handle section views
  const parts = view.split("-");
  if (parts.length >= 2) {
    const projectType = parts[0];
    const iconMap: { [key: string]: string } = {
      ecommerce: "mdi-shopping",
      banking: "mdi-bank",
      chatbot: "mdi-robot",
      social: "mdi-chart-line",
    };
    return iconMap[projectType] || "mdi-folder";
  }

  return "mdi-folder";
}

function getProjectDescription(view: string) {
  const projectName = getProjectNameFromView(view);
  const descriptionMap: { [key: string]: string } = {
    "AI Project Management System":
      "Intelligent project management for solopreneurs with AI-powered task prioritization and insights",
    "E-commerce Platform":
      "A modern e-commerce platform with advanced features including user authentication, product management, shopping cart, payment integration, and admin dashboard.",
    "Mobile Banking App":
      "Secure mobile banking application with biometric authentication, real-time transactions, bill payments, and financial analytics dashboard.",
    "AI Chatbot Assistant":
      "Intelligent chatbot powered by machine learning for customer support, with natural language processing and integration capabilities.",
    "Social Media Dashboard":
      "Comprehensive social media management dashboard with analytics, scheduling, content creation, and multi-platform integration.",
  };
  return descriptionMap[projectName] || "Project description not available";
}

function getCurrentSection(view: string) {
  if (view.includes("-features")) return "Features";
  if (view.includes("-business")) return "Business";
  if (view.includes("-design")) return "Design";
  if (view.includes("-techstack")) return "Tech Stack";
  if (view.includes("-checklist")) return "Checklist";
  return "Overview";
}

function getSectionIcon(view: string) {
  if (view.includes("-features")) return "mdi-file-document-edit";
  if (view.includes("-business")) return "mdi-calendar-check";
  if (view.includes("-design")) return "mdi-chart-pie";
  if (view.includes("-techstack")) return "mdi-file-document-edit";
  if (view.includes("-checklist")) return "mdi-checkbox-marked-outline";
  return "mdi-information";
}

function getProjectProgress(view: string) {
  if (view === "project") {
    return 65; // AI Project Management System progress
  }

  if (view.startsWith("project-")) {
    const project = ongoingProjects.value.find((p) => p.view === view);
    return project ? project.progress : 0;
  }

  // Handle section views
  const parts = view.split("-");
  if (parts.length >= 2) {
    const projectType = parts[0];
    const progressMap: { [key: string]: number } = {
      ecommerce: 75,
      banking: 45,
      chatbot: 30,
      social: 60,
    };
    return progressMap[projectType] || 0;
  }

  return 0;
}

function getSectionProgress(view: string) {
  // Random section progress for demonstration
  const sectionProgressMap: { [key: string]: number } = {
    features: 85,
    business: 60,
    design: 40,
    techstack: 90,
    checklist: 75,
  };

  for (const [section, progress] of Object.entries(sectionProgressMap)) {
    if (view.includes(`-${section}`)) {
      return progress;
    }
  }

  return 50;
}

function getRemainingDays(view: string) {
  // Calculate remaining days based on project type and progress
  const projectProgress = getProjectProgress(view);
  const baseDays = 90; // Base project duration
  const remainingPercentage = (100 - projectProgress) / 100;
  return Math.max(1, Math.round(baseDays * remainingPercentage));
}

function generateProjectInsights() {
  console.log(
    "Generating project insights for:",
    getProjectNameFromView(currentView.value)
  );
}

function editProjectSection() {
  console.log(
    "Editing project section:",
    getCurrentSection(currentView.value),
    "for",
    getProjectNameFromView(currentView.value)
  );
}

function viewProjectDetails() {
  console.log(
    "Viewing project details for:",
    getProjectNameFromView(currentView.value)
  );
}

function viewProjectAnalytics() {
  console.log(
    "Viewing project analytics for:",
    getProjectNameFromView(currentView.value)
  );
}

// Chat functionality
const showChat = ref(false);
const chatMessages = ref([
  {
    id: 1,
    text: "Hello! I'm your AI assistant. How can I help you with your projects today?",
    timestamp: Date.now() - 60000,
    type: "ai-message",
  },
]);
const newMessage = ref("");
const chatMessagesRef = ref<HTMLElement | null>(null);
const isTyping = ref(false);
const showChatMenu = ref(false);

function toggleChat() {
  showChat.value = !showChat.value;
  if (showChat.value) {
    // Auto-scroll to bottom when chat opens
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }
}

function minimizeChat() {
  showChat.value = false;
}

function formatMessageTime(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function scrollToBottom() {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
}

function sendMessage() {
  if (newMessage.value.trim() && !isTyping.value) {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: newMessage.value,
      timestamp: Date.now(),
      type: "user-message",
    };
    chatMessages.value.push(userMessage);

    const userInput = newMessage.value;
    newMessage.value = "";

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    // Show typing indicator
    isTyping.value = true;

    // Simulate AI response with typing delay
    setTimeout(() => {
      isTyping.value = false;
      const aiResponse = generateAIResponse(userInput);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        timestamp: Date.now(),
        type: "ai-message",
      };
      chatMessages.value.push(aiMessage);

      // Auto-scroll to bottom after AI response
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  }
}

function generateAIResponse(userInput: string) {
  const input = userInput.toLowerCase();

  // Enhanced responses with more personality and helpful suggestions
  if (input.includes("help") || input.includes("assist")) {
    return "I'm here to help! I can assist you with:\n\n• 📊 Project management and progress tracking\n• ✅ Task organization and prioritization\n• 🎯 Business validation and planning\n• 🎨 Design and feature analysis\n• 📋 Checklist creation and management\n\nWhat would you like to work on today?";
  }

  if (input.includes("project") || input.includes("progress")) {
    return "Great! I can help you with project management. Here are some things we can do:\n\n• 📈 Review your current project progress\n• 🎯 Set new milestones and goals\n• 📋 Create task lists and priorities\n• 🔍 Analyze project bottlenecks\n• 📊 Generate progress reports\n\nWhich project would you like to focus on?";
  }

  if (input.includes("task") || input.includes("todo")) {
    return "Task management is key to success! I can help you:\n\n• ➕ Create new tasks with priorities\n• 📝 Organize tasks by project or category\n• ⏰ Set deadlines and reminders\n• 📊 Track completion rates\n• 🎯 Prioritize your workload\n\nWould you like to add a new task or review your current list?";
  }

  if (
    input.includes("feature") ||
    input.includes("business") ||
    input.includes("design")
  ) {
    return "Excellent! Let's work on your project strategy. I can help with:\n\n• 🎨 Design system and UI/UX planning\n• 💼 Business model validation\n• 🚀 Feature prioritization and roadmap\n• 📊 Market analysis and competitor research\n• 🎯 User experience optimization\n\nWhich aspect would you like to explore first?";
  }

  if (
    input.includes("hello") ||
    input.includes("hi") ||
    input.includes("hey")
  ) {
    return "Hello there! 👋 I'm your AI project assistant, ready to help you succeed! I can see you're working on some exciting projects. How can I help you today?\n\n💡 Tip: Try asking me about project progress, task management, or business planning!";
  }

  if (input.includes("checklist") || input.includes("check")) {
    return "Checklists are powerful productivity tools! I can help you:\n\n• 📋 Create comprehensive project checklists\n• ✅ Track completion status\n• 🔄 Set up recurring task lists\n• 📊 Monitor checklist progress\n• 🎯 Prioritize checklist items\n\nWould you like to create a new checklist or review existing ones?";
  }

  if (
    input.includes("business") ||
    input.includes("market") ||
    input.includes("competitor")
  ) {
    return "Business strategy is crucial! Let's analyze:\n\n• 📊 Market size and growth potential\n• 🏢 Competitive landscape analysis\n• 💰 Revenue model validation\n• 🎯 Target audience identification\n• 📈 Business metrics and KPIs\n\nWhat specific business aspect would you like to explore?";
  }

  if (
    input.includes("design") ||
    input.includes("ui") ||
    input.includes("ux")
  ) {
    return "Design is where creativity meets functionality! I can help with:\n\n• 🎨 UI/UX design principles and best practices\n• 🎯 User journey mapping\n• 📱 Responsive design strategies\n• 🎨 Color schemes and typography\n• 🔍 Usability testing and optimization\n\nWhat design challenge are you facing?";
  }

  if (
    input.includes("tech") ||
    input.includes("stack") ||
    input.includes("technology")
  ) {
    return "Technology choices can make or break a project! Let's discuss:\n\n• 💻 Frontend and backend technologies\n• 🗄️ Database and infrastructure options\n• 🔧 Development tools and frameworks\n• 📱 Mobile and web platform decisions\n• 🔒 Security and scalability considerations\n\nWhat's your current tech stack or what are you considering?";
  }

  // Default response with suggestions
  return `I understand you're asking about "${userInput}". Here are some ways I can help:\n\n• 🚀 **Project Planning**: Set goals, milestones, and timelines\n• 📋 **Task Management**: Organize and prioritize your work\n• 💼 **Business Strategy**: Validate ideas and analyze markets\n• 🎨 **Design & UX**: Create user-friendly interfaces\n• 🔧 **Tech Decisions**: Choose the right technologies\n\nWhat would you like to focus on? I'm here to guide you through every step!`;
}

function clearChat() {
  chatMessages.value = [];
}

function exportChat() {
  console.log("Exporting chat");
}

function openHelpDialog() {
  console.log("Showing help");
}
</script>

<style scoped>
.todo-list {
  max-height: 600px;
  overflow-y: auto;
}

.completed-todo {
  opacity: 0.7;
  background-color: rgba(0, 0, 0, 0.02);
}

.completed-todo:hover {
  opacity: 0.9;
}

.todo-list .v-card {
  transition: all 0.3s ease;
}

.todo-list .v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Custom scrollbar for todo list */
.todo-list::-webkit-scrollbar {
  width: 6px;
}

.todo-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.todo-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.todo-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* GitHub-style streak grid */
.streak-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  margin: 0 auto;
  max-width: 120px;
}

.streak-day {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.streak-day.completed {
  background-color: #39d353;
}

.streak-day.empty {
  background-color: #ebedf0;
}

.streak-day:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Dark theme adjustments */
.v-theme--dark .streak-day.empty {
  background-color: #30363d;
}

.v-theme--dark .streak-day.completed {
  background-color: #39d353;
}

/* Dashboard specific styles */
.dashboard-overview {
  max-width: 1400px;
  margin: 0 auto;
}

.task-card {
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-item {
  padding: 16px;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.v-theme--dark .stat-item {
  background-color: #424242;
}

/* Floating chat container */
.floating-chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.floating-chat-btn {
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 80px !important;
  height: 80px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
}

.floating-chat-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
}

.chat-open {
  transform: rotate(45deg);
}

.chat-icon-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}

.chat-box {
  width: 350px;
  height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: none;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
  flex-shrink: 0;
}

.chat-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.messages-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  animation: fadeInUp 0.3s ease;
}

.message-wrapper.user-message {
  justify-content: flex-end;
}

.message-wrapper.ai-message {
  justify-content: flex-start;
}

.message-bubble {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-width: 80%;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.user-message .message-content {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 6px;
}

.ai-message .message-content {
  background: white;
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 6px;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: right;
}

.ai-message .message-time {
  text-align: left;
}

.message-avatar {
  flex-shrink: 0;
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #999;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-input-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
  flex-shrink: 0;
}

.input-wrapper {
  width: 100%;
}

.chat-input {
  width: 100%;
}

.chat-input .v-field {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.chat-menu {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chat-menu .v-list {
  padding: 8px;
}

.chat-menu .v-list-item {
  border-radius: 8px;
  margin: 2px 0;
  transition: all 0.2s ease;
}

.chat-menu .v-list-item:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(4px);
}

/* Custom scrollbar for chat messages */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.3);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.5);
}

/* Dark theme adjustments */
.v-theme--dark .chat-box {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.v-theme--dark .chat-header {
  background: rgba(44, 62, 80, 0.95);
  color: white;
}

.v-theme--dark .chat-messages {
  background: rgba(44, 62, 80, 0.9);
}

.v-theme--dark .ai-message .message-content {
  background: rgba(52, 73, 94, 0.9);
  color: white;
  border-color: rgba(255, 255, 255, 0.1);
}

.v-theme--dark .chat-input-container {
  background: rgba(44, 62, 80, 0.95);
}

.v-theme--dark .chat-input .v-field {
  background: rgba(52, 73, 94, 0.9);
}

.v-theme--dark .chat-menu {
  background: rgba(44, 62, 80, 0.95);
  color: white;
}

.v-theme--dark .chat-menu .v-list-item:hover {
  background: rgba(102, 126, 234, 0.2);
}
</style>
