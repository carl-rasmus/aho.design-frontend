<template>
  <section class="container">
    <div class="columns">
      <div class="column is-full">
        <h4 v-if="result.course.name">
          <nuxt-link :to="`/course/${result.course.slug.current}`">
          {{ result.course.name }}, {{ result.course.year }}
          </nuxt-link>
        </h4>
        <h1 v-if="result.name">{{ result.name }}</h1>
        <h4 v-if="result.subtitle">{{ result.subtitle }}</h4>
        <h5 v-if="result.duration">Effective work time: <b>{{result.duration}}</b></h5>
      </div>
      <div class="column is-three-fifths is-offset-1">
        <div v-if="result.blurb">
          <block-content :blocks="result.blurb" />
        </div>
      </div>
      <div class="column is-full">
        <div class="columns galleryContainer">
          <div v-for="project in result.projects" class="column is-full-mobile is-half-tablet is-one-third-desktop thumbContainer">
            <nuxt-link :to="`/project/${project.slug.current}`" class="thumbLink">
              <base-image v-if="project.headerImage" :image="project.headerImage" class="thumbImage"/>
              <h3 v-if="project.name">{{ project.name }}</h3>
            </nuxt-link>
            <ul v-if="project.authors">
              <li v-for="author in project.authors" class="byLine">
                <nuxt-link :to="`/student/${author.slug.current}`">
                  <h5>{{ author.firstName }}</h5>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import sanityClient from '@/utils/sanityClient'
import BlockContent from 'sanity-blocks-vue-component'
import BaseImage from '@/components/BaseImage'

export default {
  components: {
    BlockContent,
    BaseImage
  },
  async asyncData ({ params }) {
    const result = await sanityClient.fetch(`
      *[_type == 'task' && slug.current == $slug] {
        _id,
        name,
        slug,
        subtitle,
        course->{..., participants[]->{...}},
        blurb,
        duration,
        "projects": *[_type == 'project' && references(^._id)] {
          ...,
          headerImage{..., asset->},
          authors[]->{...}
        }
      }[0]
    `, {
      slug: params.slug
    }).catch(err => console.log(err))
    if (result) {
      // console.log(result)
      return {
        result,
        title: result.name,
        url: 'https://aho.design/task/' + result.slug.current,
        description: result.blurb && result.blurb[0].children[0].text || '',
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
