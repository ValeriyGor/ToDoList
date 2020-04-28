<template>
  <div id="app">
    <header>
      <div class="container text-center">
        <h1>ToDO</h1>
      </div>
    </header>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style lang="sass">
  *
    margin: 0
    padding: 0
    box-sizing: border-box
    font-family: Montserrat, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

  body
    background-color: #111
    color: #ffffff

  #app
    color: #ffffff

  .container
    width: 100%
    max-width: 1000px
    margin: 0 auto
    padding: 15px 0

  .text-center
    text-align: center

  .button
    height: 40px
    display: inline-block
    font-size: 15px
    text-align: center
    line-height: 20px
    border: none
    outline: none
    cursor: pointer
    transition: all 0.15s
    border-radius: 3px
    padding: 10px
    text-decoration: none

    &:hover
      opacity: 0.8

    &--rounded
      width: 40px
      border-radius: 50%
      margin-left: 10px
      padding: 0
      line-height: 40px

    &--primary
      background-color: #08c
      color: #ffffff

    &--secondary
      background-color: #3b9b6e
      color: #ffffff

    &--danger
      background-color: #f00
      color: #ffffff

    &--small
      margin-left: 15px
      width: 30px
      height: 30px
      text-align: center
      line-height: 30px
      padding: 0
      font-size: 12px
      
    &--disabled
      background-color: #ccc
      opacity: 0.8

  .mb-15
    margin-bottom: 15px

  .m-15
    margin-bottom: 15px
    margin-top: 15px

  .note, .noteDetails
    &__todo
      &-list
        list-style: none
        padding-left: 15px
      &-item
        margin-bottom: 10px
        input[type="checkbox"]
          display: none
          & + span
            width: 15px
            height: 15px
            display: inline-block
            border-radius: 50%
            border: 2px solid #08c
            margin-right: 6px
            vertical-align: middle
            position: relative
          & ~ p
            display: inline-block
            margin-left: 10px
          &:checked
            & + span
              &:after
                content: ""
                display: block
                width: 8px
                height: 17px
                border-bottom: 2px solid yellowgreen
                border-right: 2px solid yellowgreen
                transform: rotate(45deg)
                position: absolute
                top: -11px
                left: 3px
            & ~ p
              text-decoration: line-through

  @media screen and (max-width: 767px)
    h2
      font-size: 18px

    .button
      height: 30px
      line-height: 16px
      font-size: 13px
      padding: 7px 15px
      &--rounded
        width: 30px
        line-height: 30px
        padding: 0
      &--small
        padding: 0
        line-height: 30px

</style>
