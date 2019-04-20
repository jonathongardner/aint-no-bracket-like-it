<template>
  <section id='home' class="hero is-info is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-6 is-offset-3">
          <h1 id='home-title' class="title large-title lobster">
            Ain't no Bracket Like It
          </h1>
          <div class="box">
            <div>
              Are you tired of picking March Madness Brackets and never winning that million dollars for getting it exactly rigth??
              What if I told you 100% of Brackets that are not unique do not win. Well... that is the case, and thats were Ain't
              No Bracket Like It comes to the rescue. ANBLI only allowes user to submit unique brackets.
            </div>
            <div>
              How does this work?<br>
              First you find a unique bracket. There are many ways to do this:
              <div class="content">
                <ol type="1">
                  <li>
                    Fill in the bracket like any other bracket. Than check to see if it is unique,
                    if it is not unique a list of brackets that are similar (using ANBLI special methods)
                    will be returned to choose from.
                  </li>
                  <li>
                    Choose a random number between 1 and 2^63... Than check to see if it is unique,
                    if it is not unique a list of closest unique number will be returned (using ANBLI special methods...)
                  </li>
                  <li>
                    Lastly... view a list of unpicked Brackets and select one before someone else does.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div>
    <img alt="Ain't No Bracket Like It logo" src="../assets/ANBLI-background.png">
    <div>
      <div>

      </div>
      <div>
      </div>
    </div>
  </div> -->
</template>
<!-- https://coolors.co/808f85-f2e9dc-91c499-2f4858-daf7dc -->
<script>
// @ is an alias to /src
export default {
  name: 'HomePage',
}
</script>
<style lang='scss'>
#home {
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('/imgs/ANBLI.png') space center center fixed;
  background-size: contain;
}
#home-title {
  font-size: 8rem;
  letter-spacing: 0.3rem;
  margin-bottom: 2rem;
}
</style>
