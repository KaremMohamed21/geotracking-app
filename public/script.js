new Vue({
  el: '#app',
  data: {
    users: [],
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios.get('/users').then((response) => {
        this.users = this.getRandomUsers(response.data, 6);
      });
    },
    getRandomUsers(people, number) {
      const selected = [];
      for (var i = 0; i < number; i++) {
        const index = Math.floor(Math.random() * people.length);
        if (selected.includes(index)) continue;
        selected.push(index);
      }
      const selectedUsers = selected.map((index) => {
        const users = ({ name, position } = people[index]);
        return users;
      });
      return selectedUsers;
    },
  },
});
