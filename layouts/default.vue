<template>
  <v-app dark>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{userFirstName}}
            </v-list-item-title>
            <v-list-item-title class="text-h6">
              {{ userFirstLastName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ communityName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <template v-for="(item, ind) in items">
          <v-list-item
            v-if="!item.children"
            :key="item.text"
            :to = "item.to"
            active-class="selected"
            @click="currentSelection = item.text"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="ml-4">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-if="item.children"
            :key="item.text"
            color="green lighten-2"
            v-model="item.model"
            :prepend-icon= "item.icon"
            :append-icon="item.model ? iconUp : iconDown"

          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              active-class="selected"
              :to = "child.to"
              @click="currentSelection = child.text"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

        </template>
      </v-list>
      <template v-slot:append>
        <v-row class="mb-6" align="center" justify="center">
          <v-btn
            color="success"
            dark
            outlined
            @click="exit"
          >
            SALIR
          </v-btn>
        </v-row>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      color = "green lighten-2"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main style="background-color: #f1f1f1">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      currentSelection: '',
      iconUp: 'mdi-chevron-up',
      iconDown: 'mdi-chevron-down',
      itemsSupervisor: [
        { icon: 'mdi-sprout', text: 'Recursos', model:false,
          children: [
            { text: 'Insumos', to: '/insumos' },
            { text: 'Productos', to: '/productos' },
            {text: 'Presupuesto de compra', to: '/presupuesto'},
          ],
        },
        { icon: 'mdi-basket', text: 'Flujos', model:false,
          children:[
            {text: 'Entrada de insumos', to: '/entradas'},
            {text: 'Salida de insumos', to: '/salidas'},
            {text: 'Entrada de productos', to: '/entradasProducto'},
          ]
        },
        { icon: 'mdi-calendar-text', text: 'Cronogramas', model: false, to: '/cronogramas'},
        { icon: 'mdi-chart-line', text: 'Ventas', model:false,
          children:[
            {text: 'Proyecciones', to: '/proyecciones'},
            {text: 'Historico', to: '/historico'},
          ]
        },
        { icon: 'mdi-face-man', text: 'Gestión', model:false,
          children:[
            {text: 'Productores', to: '/productores'},
            {text: 'Configuraciones', to:'/configuraciones'},
          ]
        },
      ],
      itemsProducer: [
        { icon: 'mdi-sprout', text: 'Recursos', model:false,
          children: [
            { text: 'Insumos', to: '/insumos' },
            { text: 'Productos', to: '/productos' },
            {text: 'Presupuesto de compra', to: '/presupuesto'},
          ],
        },
        { icon: 'mdi-basket', text: 'Flujos', model:false,
          children:[
            {text: 'Entrada de insumos', to: '/entradas'},
            {text: 'Salida de insumos', to: '/salidas'},
            {text: 'Entrada de productos', to: '/entradasProducto'},
          ]
        },
        { icon: 'mdi-calendar-text', text: 'Cronogramas', model: false, to: '/cronogramas'},
        { icon: 'mdi-chart-line', text: 'Ventas', model:false,
          children:[
            {text: 'Proyecciones', to: '/proyecciones'},
            {text: 'Historico', to: '/historico'},
          ]
        },
      ],
      title: 'Cultivos Unidos - Sistema Agrícola Gestor'
    }
  },
  methods:{
    ...mapActions({
      logout:'login/login/logout',
    }),

    async exit(){
      await this.logout();
      await this.$router.push("/login")
    }
  },

  computed:{
    ...mapState({
      userAuth:state => state.login.login.userAuth,
      role:state => state.login.login.role,
    }),
    items:{
      get(){
        if (this.role === 'SUPERVISOR') return this.itemsSupervisor;
        else return this.itemsProducer;
      }
    },
    userFirstName:{
      get(){
        if (this.userAuth === null || this.userAuth === undefined) return '';
        return this.userAuth.userName;
      },
    },
    userFirstLastName:{
      get(){
        if (this.userAuth === null || this.userAuth === undefined) return '';
        return this.userAuth.userFirstLastName;
      },
    },
    communityName:{
      get(){
        if (this.userAuth === null || this.userAuth === undefined) return '';
        return this.userAuth.communityName;
      }
    }
  },
  middleware: 'authenticated'
}
</script>

<style scoped>
.v-list__group__header {
  background-color: #f5f5f5;
}

.selected{
  background-color: #f1f1f1;
}
</style>
