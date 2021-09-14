import stampit from 'stampit';

const ServiceStamp = stampit({
  props: {
    fetchApi: null,
  },

  init({ fetchApi }) {
    this.fetchApi = fetchApi;
  },
});

export default ServiceStamp;
