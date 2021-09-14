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
              JUAN AURELIO
            </v-list-item-title>
            <v-list-item-title class="text-h6">
              VILLAVICENCIO
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
            @click="currentSelection = item.text"
            :class="currentSelection == item.text ? 'grey': ''"
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
            color="success"
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
              :to = "child.to"
              @click="item.model = false;currentSelection = child.text"
              :class="currentSelection == child.text ? 'grey': ''"
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
      drawer: false,
      fixed: true,
      communityName: '',
      currentSelection: '',
      iconUp: 'mdi-chevron-up',
      iconDown: 'mdi-chevron-down',
      items: [
        { icon: 'mdi-calendar-text', text: 'Cronograma', model: false, to: '/cronograma'},
        { icon: 'mdi-sprout', text: 'Recursos', model:false,
          children: [
            { text: 'Insumos', to: '/insumos' },
            { text: 'Productos', to: '/productos' },
          ],
        },
        { icon: 'mdi-basket', text: 'Flujos', model:false,
          children:[
            {text: 'Entrada de insumos', to: '/entradas'},
            {text: 'Salida de insumos', to: '/salidas'},
          ]
        },
        { icon: 'mdi-chart-line', text: 'Ventas', model:false,
          children:[
            {text: 'Proyecciones', to: '/proyecciones'},
            {text: 'Historico de ventas', to:'/ventas'},
          ]
        },
        { icon: 'mdi-face-man', text: 'Gestión', model:false,
          children:[
            {text: 'Usuarios', to: '/usuarios'},
            {text: 'Configuraciones', to:'/configuraciones'},
          ]
        },
      ],
      title: 'Cultivos Unidos - Sistema Agrícola Gestor'
    }
  },
  async created(){
    await this.getCommunityData();
    this.communityName = this.communityData.communityName;
  },
  methods:{
    ...mapActions({
      getCommunity: 'comunidad/community/getCommunity'
    }),

    async getCommunityData(){
      await this.getCommunity({communityId: 1});
    }
  },

  computed:{
    ...mapState({
      communityData: state => state.comunidad.community.community,
    }),
  }
}
</script>

<style scoped>
.v-list__group__header {
  background-color: #f5f5f5;
}
</style>
