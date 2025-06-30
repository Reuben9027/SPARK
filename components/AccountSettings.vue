<template>
  <div class="account-settings">
    <v-row>
      <!-- Profile Information -->
      <v-col cols="12" md="8">
        <v-card elevation="2" class="settings-card">
          <v-card-title>
            <span class="text-h6 font-weight-medium">Profile Information</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="saveProfile">
              <v-row>
                <v-col cols="12" class="text-center mb-4">
                  <v-avatar size="120" class="profile-avatar">
                    <v-img
                      src="https://randomuser.me/api/portraits/men/85.jpg"
                    ></v-img>
                  </v-avatar>
                  <div class="mt-2">
                    <v-btn variant="outlined" size="small">
                      <v-icon>mdi-camera</v-icon>
                      Change Photo
                    </v-btn>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.firstName"
                    label="First Name"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.lastName"
                    label="Last Name"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.email"
                    label="Email"
                    variant="outlined"
                    density="compact"
                    type="email"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.phone"
                    label="Phone"
                    variant="outlined"
                    density="compact"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="profile.bio"
                    label="Bio"
                    variant="outlined"
                    density="compact"
                    rows="3"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="primary" type="submit"> Save Changes </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Account Settings -->
      <v-col cols="12" md="4">
        <v-card elevation="2" class="settings-card">
          <v-card-title>
            <span class="text-h6 font-weight-medium">Account Settings</span>
          </v-card-title>
          <v-card-text>
            <div class="settings-section">
              <h4 class="text-subtitle-1 font-weight-medium mb-3">
                Notifications
              </h4>
              <v-switch
                v-model="settings.emailNotifications"
                label="Email Notifications"
                color="primary"
                hide-details
                class="mb-3"
              ></v-switch>
              <v-switch
                v-model="settings.smsNotifications"
                label="SMS Notifications"
                color="primary"
                hide-details
                class="mb-3"
              ></v-switch>
              <v-switch
                v-model="settings.pushNotifications"
                label="Push Notifications"
                color="primary"
                hide-details
              ></v-switch>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="settings-section">
              <h4 class="text-subtitle-1 font-weight-medium mb-3">Privacy</h4>
              <v-switch
                v-model="settings.profileVisibility"
                label="Public Profile"
                color="primary"
                hide-details
                class="mb-3"
              ></v-switch>
              <v-switch
                v-model="settings.dataSharing"
                label="Data Sharing"
                color="primary"
                hide-details
              ></v-switch>
            </div>

            <v-divider class="my-4"></v-divider>

            <div class="settings-section">
              <h4 class="text-subtitle-1 font-weight-medium mb-3">Security</h4>
              <v-btn
                variant="outlined"
                block
                class="mb-2"
                @click="changePassword"
              >
                <v-icon>mdi-lock</v-icon>
                Change Password
              </v-btn>
              <v-btn variant="outlined" block @click="enableTwoFactor">
                <v-icon>mdi-shield-key</v-icon>
                Two-Factor Auth
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Preferences -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card elevation="2" class="settings-card">
          <v-card-title>
            <span class="text-h6 font-weight-medium">Preferences</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-select
                  v-model="preferences.language"
                  :items="languageOptions"
                  label="Language"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="preferences.timezone"
                  :items="timezoneOptions"
                  label="Timezone"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="preferences.dateFormat"
                  :items="dateFormatOptions"
                  label="Date Format"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="preferences.theme"
                  :items="themeOptions"
                  label="Theme"
                  variant="outlined"
                  density="compact"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

interface Settings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  profileVisibility: boolean;
  dataSharing: boolean;
}

interface Preferences {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: string;
}

const profile = ref<Profile>({
  firstName: "Dr. John",
  lastName: "Smith",
  email: "john.smith@dentalclinic.com",
  phone: "+1 (555) 123-4567",
  bio: "Experienced dental professional with over 10 years of practice in general dentistry and cosmetic procedures.",
});

const settings = ref<Settings>({
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  profileVisibility: true,
  dataSharing: false,
});

const preferences = ref<Preferences>({
  language: "English",
  timezone: "UTC-5 (Eastern Time)",
  dateFormat: "MM/DD/YYYY",
  theme: "Light",
});

const languageOptions = ["English", "Spanish", "French", "German"];
const timezoneOptions = [
  "UTC-5 (Eastern Time)",
  "UTC-6 (Central Time)",
  "UTC-7 (Mountain Time)",
  "UTC-8 (Pacific Time)",
];
const dateFormatOptions = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
const themeOptions = ["Light", "Dark", "Auto"];

const saveProfile = () => {
  console.log("Saving profile:", profile.value);
  // Add save logic here
};

const changePassword = () => {
  console.log("Change password clicked");
  // Add password change logic here
};

const enableTwoFactor = () => {
  console.log("Enable two-factor authentication clicked");
  // Add 2FA logic here
};

// Define component name for better debugging
defineOptions({
  name: "AccountSettings",
});
</script>

<style scoped>
.account-settings {
  animation: fadeIn 0.5s ease-in-out;
}

.settings-card {
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.profile-avatar {
  border: 4px solid #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.settings-section {
  margin-bottom: 16px;
}

.settings-section:last-child {
  margin-bottom: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
