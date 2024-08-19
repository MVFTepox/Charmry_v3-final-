<template>
  <div class="flex flex-col space-y-4">
    <div class="flex justify-center">
      <button @click="openModal" class="text-2xl p-2 w-2/5 btn bg-[#B66141] rounded-3xl text-white">
        Escribe un Comentario
      </button>
    </div>
    <div class="mx-auto">
      <transition-group name="fade" tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
        <ReviewCard v-for="(comment, index) in displayedComments" :key="index" :reviewContent="comment.content"
          :reviewDate="comment.date" username="User" />
      </transition-group>
      <div v-if="comments.length > 4" class="flex justify-center mt-4">
        <button @click="toggleShowMore" class="p-2 bg-[#B66141] w-1/5 text-[#EDDAAB] rounded-3xl">
          {{ showMore ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0  rounded-3xl z-50">
      <div class="modal modal-open ">
        <div class="modal-box  flex flex-col justify-center content-center my-20 mx-auto">
          <h2 class="text-2xl font-bold mb-4">Escribe un comentario</h2>
          <textarea v-model="newComment" placeholder="Escribe un comentario..."
            class=" resize-none  p-3 border-4 border-[#eddaab] rounded-bl-lg text-lg w-full"></textarea>
          <div class="modal-action">
            <button @click="addComment" class="text-1xl p-2 btn bg-[#B66141] w-3/5 rounded-3xl text-white">
              Agregar un Comentario!!
            </button>
            <button @click="closeModal" class="text-1xl p-2 btn bg-red-500 w-1/5 rounded-3xl text-white">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import ReviewCard from './ReviewCard.vue'

export default defineComponent({
  name: 'CommentSection',
  components: {
    ReviewCard
  },
  setup() {
    const newComment = ref('')
    const comments = ref<{ content: string; date: string }[]>([])
    const showMore = ref(false)
    const isModalOpen = ref(false)

    const addComment = () => {
      if (newComment.value) {
        comments.value.unshift({
          content: newComment.value,
          date: new Date().toLocaleDateString()
        })
        newComment.value = ''
        closeModal()
      }
    }

    const toggleShowMore = () => {
      showMore.value = !showMore.value
    }

    const openModal = () => {
      isModalOpen.value = true
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    const displayedComments = computed(() =>
      showMore.value ? comments.value : comments.value.slice(0, 4)
    )

    return {
      newComment,
      comments,
      showMore,
      displayedComments,
      addComment,
      toggleShowMore,
      isModalOpen,
      openModal,
      closeModal
    }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-open {
  display: block;
}

.modal-box {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
}

.modal-action {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
