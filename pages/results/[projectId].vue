<template>
  <v-sheet
    class="d-flex align-center justify-center"
    height="100vh"
    width="100vw"
    color="background"
  >
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <!-- Left Column: Project Name -->
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
                  <span class="gradient-text">Smart Prompt</span>
                </h1>
                <p class="text-body-1 text-medium-emphasis">
                  Name your project and let AI guide you
                </p>
              </div>

              <v-textarea
                v-model="projectName"
                placeholder="Name your project"
                rounded="lg"
                auto-grow
                no-resize
                variant="outlined"
                color="primary"
                class="mb-4"
                bg-color="surface"
                rows="3"
              />

              <div class="d-flex justify-center">
                <v-btn
                  color="primary"
                  variant="elevated"
                  size="large"
                  @click="refineProject"
                  class="px-6"
                  prepend-icon="mdi-content-copy"
                >
                  Copy
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Right Column: Project Description -->
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
                  <span class="gradient-text">Project Details</span>
                </h1>
                <p class="text-body-1 text-medium-emphasis">
                  Review and refine your project description
                </p>
              </div>

              <v-textarea
                v-model="projectDescription"
                placeholder="Describe your project..."
                rounded="lg"
                auto-grow
                no-resize
                variant="outlined"
                color="primary"
                class="mb-4"
                bg-color="surface"
                rows="4"
              />

              <div class="d-flex justify-center gap-3">
                <v-btn
                  color="secondary"
                  variant="outlined"
                  size="large"
                  @click="refineProject"
                  class="px-6"
                  prepend-icon="mdi-pencil"
                >
                  Edit
                </v-btn>
                <v-btn
                  color="primary"
                  variant="elevated"
                  size="large"
                  @click="submitProject"
                  class="px-6"
                  prepend-icon="mdi-check"
                >
                  Save Project
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

const route = useRoute()
const projectName = ref("");
const projectDescription = ref("");
const router = useRouter();
const projectId = route.params.projectId

const submitProject = async () => {
  console.log("Project Name:", projectName.value);

  const user = await getCurrentUser();

  if(!user){
    return;
  }

  const idToken = await user.getIdToken();
  const metadata = {
    title: projectName.value,
    description: projectDescription.value

  }

  const res = await fetch('/api/users/update-project-metadata', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken, projectId, metadata }),
  })

  const data = await res.json();
  console.log(data);

  navigateTo('/dashboard');
  //then route
};

const refineProject = async () =>{
  const user = await getCurrentUser();

  console.log(user);
  if(!user){
    return;
  }

  const idToken = await user.getIdToken();
  const messages = {
    title: projectName.value,
    description: projectDescription.value

  }

  const res = await fetch('/api/ai/refine', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken, projectId, messages }),
  })

  try{
    const data = await res.json();
    const reply = data.reply;
    console.log(data);
    projectName.value = reply.title? reply.title :  projectName.value
    projectDescription.value = reply.description?reply.description:projectDescription.value
  }catch(error){

  }
  
  

}
  
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

.gap-3 {
  gap: 12px;
}
</style>
