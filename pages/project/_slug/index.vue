<template>
  <section class="container">
    <div class="columns">
      <div class="column is-full">
        <h5 v-if="project.course">
          <nuxt-link :to="`/course/${project.course.slug.current}`">
            {{ project.course.name }}, {{ project.course.year }}
          </nuxt-link>
        </h5>
        <h4 v-if="project.task">Task:
          <nuxt-link :to="`/task/${project.task.slug.current}`">
            {{ project.task.name }}
          </nuxt-link>
        </h4>
        <h1 v-if="project.name">
          {{ project.name }}
        </h1>
        <h4 v-if="project.subtitle">
            {{ project.subtitle }}
        </h4>
        <ul v-if="project.authors">
          <li v-for="student in project.authors" class="byLine">
            <nuxt-link :to="`/student/${student.slug.current}`">
              <h4>{{ student.firstName }} {{ student.lastName }}</h4>
            </nuxt-link>
          </li>
        </ul>
        <h5 v-if="project.task.duration">Effective work time: <b>{{project.task.duration}}</b></h5>
      </div>

      <div v-if="project.headerImage" class="column is-full-mobile is-four-fifths is-offset-1">
        <base-image :image="project.headerImage" />
      </div>
      <div class="column is-full-mobile is-three-fifths is-offset-one-fifth">
        <div v-if="project.projectDescription">
          <block-content :blocks="project.projectDescription" />
        </div>
        <h5 v-if="project.website">
          Project website: <a :href="project.website" target="_blank">
            {{ project.website }}
          </a>
        </h5>
      </div>
      <div v-if="project.projectImages" class="column is-full-mobile is-four-fifths is-offset-1">
        <ul>
          <li v-for="supportImage in project.projectImages">
            <div v-if="supportImage._type == 'supportImage'">
              <base-image :image="supportImage" />
            </div>
            <div v-else-if="supportImage._type == 'videoUpload'">
              <video :src="supportImage.asset.url" controls>Your browser does not support this video format :(</video>
            </div>
            <div v-else-if="supportImage._type == 'videoUrl'">
              <!-- {{supportImage.url}} -->
              <iframe :src="getIframeSrc(supportImage)" width="560" height="350" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import sanityClient from '@/utils/sanityClient'
import BlockContent from 'sanity-blocks-vue-component'
import BaseImage from '@/components/BaseImage'
import getVideoId from 'get-video-id'

export default {
  components: {
    BlockContent,
    BaseImage
  },
  async asyncData ({ params }) {
    const project = await sanityClient.fetch(`
      *[_type == 'project' && slug.current == $slug]
      {
        name,
        slug,
        course->{name, year, slug},
        task->{name, slug, duration},
        subtitle,
        projectDescription,
        headerImage{..., asset->},
        projectImages[]{..., asset->},
        authors[]->{_id, firstName, lastName, slug},
        website
      }[0]
    `, {
      slug: params.slug,
    }).catch(err => console.log(err))

    if (project) {
      console.log(project)
      return {
        project,
        title: project.name,
        url: 'https://aho.design/project/' + project.slug.current,
        description: project.projectDescription && project.projectDescription[0].children[0].text || '',
        image: project.headerImage.asset.url
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
        { hid: 'ogImage', property: 'og:image', content: this.image},
        { hid: 'twitterTitle', name: 'twitter:title', content: this.title },
        { hid: 'twitterDescription', name: 'twitter:description', content: this.description },
        { hid: 'twitterImage', name: 'twitter:image', content: this.image},
      ]
    }
  },
  methods: {
    getIframeSrc(object) {
      const {id, service} = getVideoId(object.url)
      return service === 'youtube'
        ? `https://www.youtube.com/embed/${id}`
        : `https://player.vimeo.com/video/${id}?color=e64800&title=0&byline=0&portrait=0`
    }
  }
}
</script>

<style>
</style>
