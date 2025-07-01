<template>
  <v-sheet
    class="d-flex align-center justify-center"
    height="100vh"
    width="100vw"
    color="background"
  >
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6" lg="4">
          <v-card
            class="mx-auto"
            max-width="500"
            color="surface"
            elevation="8"
            rounded="xl"
            variant="outlined"
          >
            <v-card-text class="pa-6">
              <div class="text-center mb-6">
                <h1 class="text-h3 font-weight-bold mb-2">
                  <span class="gradient-text">Welcome!</span>
                </h1>
                <p class="text-body-1 text-medium-emphasis">
                  Let's create your first project and start building smarter
                </p>
              </div>

              <v-textarea
                v-model="aboutme"
                variant="outlined"
                color="primary"
                placeholder="Describe your project idea, goals, or what you want to build..."
                auto-grow
                no-resize
                rounded="lg"
                rows="4"
                class="mb-4"
                bg-color="surface"
              ></v-textarea>

              <div class="d-flex justify-center">
                <!-- :disabled="!aboutme.trim()" -->
                <v-btn
                  co
                  lor="primary"
                  variant="elevated"
                  size="large"
                  @click="goToProject"
                  class="px-6"
                  prepend-icon="mdi-rocket-launch"
                >
                  Create Project
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const aboutme = ref("");
const router = useRouter();

const goToProject = async () => {
  console.log(aboutme.value);
  try{
    const {user} = useCurrentUser();
    // const user = await getCurrentUser();
    const idToken = await user.getIdToken();
    

    const metadata = {
      first_prompt : aboutme.value,
    }

    const res = await fetch('/api/users/init-project', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken, metadata}),
    })
    const data = await res.json();
    const projectId = data.project.id;
    console.log(data.project.id);
    router.replace(`/results/${projectId}`);
  }catch(error){
  }
  // router.replace("/results");
};











</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.v-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.v-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.v-textarea :deep(.v-field__outline) {
  border-color: rgba(102, 126, 234, 0.3) !important;
}

.v-textarea :deep(.v-field--focused .v-field__outline) {
  border-color: #667eea !important;
}
</style>
