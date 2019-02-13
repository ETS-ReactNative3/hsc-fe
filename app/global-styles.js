import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    --tk-detail-bg-color: #3078C5;
    --tk-detail-color: white;
    --cmt-color: white;
    --cmt-bg-color: white;
    --font-family: Arial, Helvetica, sans-serif;
    --layout-main-color: #3078C5;
  }

  body {
    font-family: var(--font-family);
  }
  body.fontLoaded {
    font-family: var(--font-family);
  }
  #app {
    background-color: white;
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    font-family: var(--font-family);
    line-height: 1.5em;
  }
  .ui.vertical.menu{
    width: 100%!important
  }
  .body-content-login{
    width: 100%;
  }
  .ui.page.modals.dimmer.transition.visible.active>ui modal transition visible active{
    top: 35px!important;
  }
  .wrapper-menu div,
  .wrapper-menu a.item:last-child{
    border-radius: 0px!important;
  }
  .wrapper-menu a.item{
    padding-left: 0px!important;
    padding-right: 0px!important;
    color: #fafafa!important;
    border-bottom: 1px solid!important;
  }
  .wrapper-menu div{
    padding-top: 0px!important;
    padding-bottom: 0px!important;
    border-bottom: 1px solid #fafafa!important;
  }
  .wrapper-menu a,
  .wrapper-menu div{
    background-color: #003a81!important;
  }
  .wrapper-menu a.item:not(:first-child):hover,
  .wrapper-menu .active.item{
    background-color: #fff!important;
    border-bottom: 1px solid #fafafa!important;
    color: #003a81!important;
  }
  .hidden{
    display: none
  }
  .show{
    display: block!important
  }
  .right-block-content .ui.dropdown{
    min-width: auto!important;
  }
  .left-block-content{
    padding-right: 0px!important;
    height: 100%;
  }
  /* INPUT DISABLED */
  .disableItem {
    opacity: .7 !important;
    pointer-events: none;
  }
  .disableOnlyInput textarea{
    opacity: .9 !important;
    pointer-events: none;
  }
  .ui.form .disabled.field,
  .ui.form .disabled.fields .field,
  .ui.form .field :disabled {
    pointer-events: none;
    opacity: .9;
  }
  /*  Support mobile screen  */
  @media only screen and (min-width:769px){
    // .right-block-content{
    //   padding-top: 80px;
    // }
    .body-content{
      width: 100%;
    }
    .wrapper-menu {
      border-radius: 0px!important;
      margin-top: 0px!important;
      height: 100%;
      min-width: 6em;
      background-color: #003a81!important;
    }
    .wrapper-menu .item img{
      height: 55px;
      width: auto!important;
      display: inline-block!important
    }
    .wrapper-menu a.item{
      padding-left: 5px!important;
      padding-right: 5px!important;
    }
  }
  @media only screen and (min-width: 550px) and (max-width:768px){
    .right-block-content{
      //padding-top: 70px;
      margin-left: -3rem;
    }
    // Custom layout menu
    .wrapper-menu {
      min-width: 9%!important;
      border-radius: 0px!important;
      margin-top: 0px!important;
      background-color: #003a81!important;
      height: 100%;
      position: fixed;
      z-index: 1;
      transition: min-width 0.5s, width 0.5s;
      -moz-transition: min-width 0.5s, width 0.5s;
      -o-transition: min-width 0.5s, width 0.5s;
      -webkit-transition: min-width 0.5s, width 0.5s;
    }
    .wrapper-menu .item i{
      float: left!important;
      padding-left: 13px;
      padding-top: 3px;
    }
    .wrapper-menu .item:first-child{
      padding-left:0px!important;
    }
    .wrapper-menu .item p{
      display: none;
      padding-top: 5px;
      padding-left: 40px;
    }
    .collapse-menu{
      min-width: 35%!important;
      transition: min-width 0.5s, width 0.5s;
      -moz-transition: min-width 0.5s, width 0.5s;
      -o-transition: min-width 0.5s, width 0.5s;
      -webkit-transition: min-width 0.5s, width 0.5s;
    }
    .wrapper-menu .item{
      min-width: 100%!important;
      min-height: 55px;
    }
    .wrapper-menu .item img{
      height: 50px;
      width: 50px!important;
    }
  }

  @media only screen and (max-width:549px){
    .right-block-content{
      //padding-top: 70px;
      margin-left: -3rem;
    }
    // Custom layout menu
    .wrapper-menu {
      min-width: 0%!important;
      border-radius: 0px!important;
      margin-top: 0px!important;
      background-color: #003a81!important;
      position: fixed;
      height: 100%;
      z-index: 1;
      transition: min-width 0.5s, width 0.5s;
      -moz-transition: min-width 0.5s, width 0.5s;
      -o-transition: min-width 0.5s, width 0.5s;
      -webkit-transition: min-width 0.5s, width 0.5s;
    }
    .wrapper-menu .item i{
      float: left!important;
      padding-left: 17px;
      padding-top: 4px;
    }
    .wrapper-menu .item:first-child{
      padding-left:0px!important;
    }
    .wrapper-menu .item p{
      padding-top: 5px;
      padding-left: 40px;
      display: none;
    }
    .wrapper-menu .item{
      min-width: 100%!important;
      min-height: 55px;
    }
    .wrapper-menu .item img{
      height: 50px;
      width: 50px!important;
      margin-left:7px!important;
    }
    .collapse-menu{
      min-width: 100%!important;
      transition: min-width 0.5s, width 0.5s;
      -moz-transition: min-width 0.5s, width 0.5s;
      -o-transition: min-width 0.5s, width 0.5s;
      -webkit-transition: min-width 0.5s, width 0.5s;
    }
  }
`;
