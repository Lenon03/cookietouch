<template>
    <div class="container-fluid">
        <!-- <table class="table is-bordered is-striped is-narrow header-fixed"> -->
        <table class="table table-striped table-inverse table-responsive table-hover table-sm header-fixed">
          <thead>
            <tr>
              <th>Date</th>
              <th>Action</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logs" :class="classRow(log)">
              <td>{{ log.date }}</td>
              <td>{{ log.action }}</td>
              <td>{{ log.message }}</td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
import Account from '../../data/Account'
import EventHub from '../../utils/event'
import moment from 'moment'

export default {
  data () {
    return {
      logs: [],
      account: new Account('cookieproject1', 'azerty123456')
    }
  },

  methods: {
    classRow (log) {
      if (log.action === 'SND') return 'bg-success'
      if (log.action === 'RCV') return 'bg-danger'
      if (log.action === 'INFO') return 'bg-info'
      if (log.action === 'WARNING') return 'bg-warning'
      if (log.action === 'CHAT') return 'bg-primary'
    },

    Appendlogs (data) {
      this.logs.push({
        date: moment().format('LTS'),
        action: data.action,
        message: data.data
      })
    }
  },

  mounted () {
    console.log('Component mounted.')

    EventHub.$on('logs', this.Appendlogs)
    this.account.connect()
  }

}
</script>

<style lang="scss" scoped>
.header-fixed {
    width: 100%
}

.header-fixed > thead,
.header-fixed > tbody,
.header-fixed > thead > tr,
.header-fixed > tbody > tr,
.header-fixed > thead > tr > th,
.header-fixed > tbody > tr > td {
    display: block;
}

.header-fixed > tbody > tr:after,
.header-fixed > thead > tr:after {
    content: ' ';
    display: block;
    visibility: hidden;
    clear: both;
}

.header-fixed > tbody {
    overflow-y: auto;
    height: 100%;
}

.header-fixed > tbody > tr > td,
.header-fixed > thead > tr > th {
    width: 33.33%;
    float: left;
}
</style>
