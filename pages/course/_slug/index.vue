<template>
  <section class="container">
    <div class="columns">
      <div class="column is-full">
        <h1>{{course.name}}, {{course.year}}</h1>
      </div>
      <div class="column is-three-fifths is-offset-1">
        <div v-if="course.blurb">
          <block-content :blocks="course.blurb" />
        </div>
      </div>

      <div class="column is-three-fifths is-offset-1">
        <h2>Tasks</h2>
        <ul>
          <li v-for="task in course.tasks" class="listLarge">
            <nuxt-link :to="`/task/${task.slug.current}`">
              {{ task.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="column is-three-fifths is-offset-1">
        <h3>Participatory students</h3>
        <ul v-if="course.participants">
          <li v-for="participants in course.participants" class="listMedium courseParticipants">
            <nuxt-link :to="`/student/${participants.slug.current}`">{{ participants.firstName }}</nuxt-link>
          </li>
        </ul>
      </div>

      <div class="column is-three-fifths is-offset-1">
        <h3>Course leaders</h3>
        <ul v-if="course.teachers">
          <li v-for="teachers in course.teachers">
            {{ teachers.firstName }} {{ teachers.lastName }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import sanityClient from '@/utils/sanityClient'
import BlockContent from 'sanity-blocks-vue-component'

export default {
  components: {
    BlockContent
  },
  async asyncData ({ params }) {
    const course = await sanityClient.fetch(`
      *[_type == 'course' && slug.current == $slug] | order(participants.firstName) {
        _id,
        name,
        year,
        slug,
        blurb,
        teachers[]->{_id, firstName, lastName, slug},
        participants[]->{_id, firstName, lastName, slug},
        course->{...},
        "tasks": *[_type == 'task' && references(^._id)]
      }[0]
    `, {
      slug: params.slug
    }).catch(err => console.log(err))
    if (course) {
      console.log(course)
      return {
        course,
        title: course.name + ', ' + course.year,
        url: 'https://aho.design/course/' + course.slug.current,
        description: course.blurb && course.blurb[0].children[0].text || '',
      }
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: this.description },

        { hid: 'ogTitle', property: 'og:title', content: this.title},
        { hid: 'ogUrl', property: 'og:url', content: this.url},
        { hid: 'ogDescription', property: 'og:description', content: this.description},
        { hid: 'twitterTitle', name: 'twitter:title', content: this.title },
        { hid: 'twitterDescription', name: 'twitter:description', content: this.description },
      ]
    }
  }
}

</script>

<style>
</style>
