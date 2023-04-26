<template>
  <div class="login">
    <div class="login-contain">
      <div class="login-right">
        <img
          src="https://cdn.dribbble.com/users/2279326/screenshots/7052817/media/3f425fa0a486f048524bfdb829139e01.gif"
          alt=""
        />
        <div>
          <h1 style="letter-spacing: 1px">Welcom to FlagshipBook</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            dolor, facere natus harum animi aut deleniti, nisi repellendus
            expedita quis quidem earum asperiores pariatur. Ad veritatis nostrum
            earum ipsam neque!
          </p>
        </div>
      </div>
      <div class="login-left">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  display: none;
}
.login {
  background-image: url("https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.login-contain {
  display: flex;
  width: 80%;
  height: 70%;
  box-shadow: 0 2px 8px gray;
  background-color: #fff;
  overflow: hidden;
}

.login-right {
  position: relative;
  width: 65%;
}

.login-right div {
  position: absolute;
  top: 50px;
  padding: 20px 130px;
  color: #fff;
  text-align: justify;
}

.login-right img {
  width: 100%;
}

.login-left {
  text-align: center;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-left h1 {
  margin-bottom: 16px;
}

.login-left a {
  color: #252525;
  text-decoration: none;
}
</style>