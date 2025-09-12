<script setup>
import { ref,computed ,inject} from 'vue';
import { useRouter } from 'vue-router';
import bd from '../../src/data.json'
const messageP=inject('key')
let baseDD=computed(()=>{
    if(localStorage.getItem('base')){
        const stored=localStorage.getItem('base');
       return JSON.parse(stored); 
    } else{
        return bd.Users
    }
})


const route=useRouter();
const pseudo=ref();
const mdp=ref();
let formState=ref('connect');
const cnid=ref('');
const Insid=ref('');

//variables d'inscription
const pseudoI=ref();
const entireName=ref();
const mail=ref();
const mdp1=ref();
const mdp2=ref();

function login() {
    localStorage.setItem('token', true)
    const index=baseDD.value.findIndex((e)=>e.name===pseudo.value && e.mot===mdp.value);
    if (index<=-1) {
        alert('Compte inexistant!! inscrivez-vous ou vérifiez vos informations')
    } else {
        alert("connexion réussi")
        messageP.changeprovide()
        route.push({
            name:'myApp',
            params:{id:index}
        })
    }
}

//fonction d'inscription
// function inscription(){
//         if ((pseudoI.value!=="") && (entireName.value!=="") && (mail.value!=="") && (mdp1.value!=="") && (mdp2.value!=="")) {
//             if (mdp1.value===mdp2.value) {
//                 const existingPseudo=baseDD.value.findIndex((e)=>e.name===pseudoI.value);
//                 const existingMail=baseDD.value.findIndex((e)=>e.email===mail.value);
//                 if (existingPseudo!== -1) {
//                     alert("Nom d'utilisateur déjà prit")
//                 }else if(existingMail!== -1){
//                     alert("Mail déjà utilisé")
//                 }else{ 
//                     const newUser={
//                         name:pseudoI.value,
//                         mot:mdp1.value,
//                         nomEntier:entireName.value,
//                         email:mail.value,
//                     }
//                     baseDD.value.push(newUser);
//                     localStorage.setItem("base", JSON.stringify(baseDD.value));
//                     alert(`Inscription Réussie ${pseudoI.value}`)
//                     formState.value='connect';// ici on revient au formulaire de connexion si inscription réussie
//                 }
                
//             } else {
//               alert('Mot de passe non conforme')  
//             }
//         } else {
//             alert('Veuillez remplir tout les champs')
//         }
//     // const newUser={}
// }


</script>


<template>

<div class="layout">
    <div class="form">
        <div class="navBtns">
            <div class="navBtn connection" :id="cnid" @click="formState='connect'">Connexion</div>
            <div class="navBtn inscription" :id="Insid" @click="formState='disconnect'">Inscription</div>
        </div>
        <div class="connexionForm" v-if="formState==='connect'">
            <form>
                <div>
                    <label for="pseudo">Nom d'utilisateur</label><br>
                    <input v-model="pseudo" name="pseudo" type="text" required>
                </div>
                <div>
                    <label for="mdp">Mot de passe</label><br>
                    <input v-model="mdp" name="mdp" type="password" required>
                </div>
                <div style="display:flex; justify-content: space-between;">
                    <button @click.prevent="login">Se connecter</button>
                    <p><a style="color: white; font-size: 1.8rem; font-weight: 700;">Mot de passe oublié</a></p>
                </div>
            </form>
        </div>

        
        <div class="disconnectionForm" v-if="formState==='disconnect'">
            <form>
                <div>
                    <label for="pseudo">Nom d'utilisateur</label><br>
                    <input v-model="pseudoI" name="pseudo" type="text" required>
                </div>
                <div>
                    <label for="namee">Nom complet</label><br>
                    <input v-model="entireName" name="name" type="text" required>
                </div>
                <div>
                    <label for="mdp">Mail</label><br>
                    <input v-model="mail" name="mdp" type="mail" required>
                </div>
                <div>
                    <label for="mdp">Mot de passe</label><br>
                    <input v-model="mdp1" name="mdp" type="password" required>
                </div>
                <div>
                    <label for="mdp2">Confirmez le mot de passe</label><br>
                    <input v-model="mdp2" name="mdp2" type="password" required>
                </div>
                <button @click.prevent="inscription">Inscription</button>
            </form>
        </div>
    </div>
</div>

</template>


<style scoped>
.layout{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form{
    display: flex;
    flex-direction: column;
    /* border: 1px solid ; */
    width: 600px;
    padding:20px;
    border-radius: 15px;
    
    box-shadow: 0px 0px 15px 5px;
    transition: all 1s;
}
.navBtns{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 10px;
    padding: 5px;
}
.navBtn{
    height: 100%;
    width: 50%;
    text-align: center;
    border-radius: 20px;
    color: white;
    padding-top: 5px;
    font-size: 2.3rem;
}
.btnback{
    background-color: rgb(240, 94, 50);
}
form{
    margin-inline: 5px;
}
button{
    margin-top:25px;
    font-size: 1.5rem;
    height: 65px;
    width: 170px;
    border-radius: 15px;
    border: none;
    color: #fff;
    background-color: rgba(243, 157, 18, 0.87);
}
p{
  margin-top:30px;
}
label{
    color: rgb(88, 88, 88);
    font-size: 1.3rem;
}
input{
    height: 65px;
    width: 100%;
    border-radius: 15px;
    margin-block: 10px;
    outline: none;
    font-size: 1.8rem;
    background-color: #ffffff34;
}
.disconnectionForm, .connexionForm{
    transition: all 0.5s;
}

</style>
<!-- https://codepen.io/shannonmoeller/pen/MWpWJGB -->
 <!-- https://codepen.io/leonam-silva-de-souza/pen/JojZmaq -->
  <!-- https://codepen.io/atzedent/pen/wBKERBE -->
   <!-- https://codepen.io/leonam-silva-de-souza/pen/LEEwGYr -->

    <!-- https://codepen.io/daniel-mu-oz/pen/NPGzmrK -->