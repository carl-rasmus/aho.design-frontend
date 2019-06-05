<template>
  <section class="container">
    <div class="columns">
      <div class="column is-full">
        <h1>AHO.design</h1>
        <h4>An archive of student projects.</h4>
      </div>
      <div class="column is-three-fifths is-offset-1">
        <h2>2019</h2>
        <ul>
          <li v-for="course in courses">
            <h3>
              <nuxt-link :to="`/course/${course.slug.current}`">
                {{ course.name }}
              </nuxt-link>
            </h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="columns">
      <div class="column is-three-quarters-tablet">
        <p class="disclaimer"><b>Note:</b> This is not an official archive of student projects from the Oslo School of Architecture and design.
          <br>Rather it's a documentation of courses and modules run by Lars Marcus Vedeler (ass. prof.)
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import sanityClient from '../utils/sanityClient'

export default {
  components: {
  },
  async asyncData ({ params }) {
    const result = await sanityClient.fetch(`{
      "courses": *[_type == 'course'] {
        _id,
        name,
        slug,
        year,
        participants
      },
      "teachers": *[_type == 'teacher'] {
        _id,
        firstName,
        lastName,
        slug
      }
    }
  `).catch(err => console.log(err))

    if (result) {
      // console.log(result)
      return {
        ...result
      }
    }
  }
}
</script>

<style>

</style>
