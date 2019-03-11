<template>
  <el-container>
    <el-main>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-input placeholder="Please input" v-model="input" @keyup.enter.native="initialSearch"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-search" circle @click="initialSearch"></el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-table :data="tableData"
                  style="width: 100%"
                  v-loading="loading"
                  :rowClassName="tableRowClassName" empty-text="No data">
          <el-table-column label="Date">
            <template slot-scope="scope">
              {{tableData[scope.$index].date | dateToString}}
            </template>
          </el-table-column>
          <el-table-column prop="title" label="Title"></el-table-column>
          <el-table-column prop="author" label="Author"></el-table-column>
          <el-table-column label="Go to">
            <template slot-scope="scope">
              <el-button icon="el-icon-arrow-right" circle @click="goTo(tableData[scope.$index].link)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-button v-if="hasMore" @click="showMore">Show more</el-button>
      </el-row>
    </el-main>

  </el-container>
</template>

<script>

  import Stackoverflow from './api/stackoverflow';

  const stackoverflow = new Stackoverflow();

  const transformData = data => {
    let result = [];
    data.items.forEach(item => {
      result.push({
        date: item.creation_date,
        title: item.title,
        author: item.owner.display_name,
        is_answered: item.is_answered,
        link: item.link
      })
    });
    return result;
  };

  export default {
    name: 'app',
    data () {
      return {
        input: "",
        tableData: [],
        loading: false,
        hasMore: false,
        page: 1,
      }
    },
    methods: {
      initialSearch(){
        this.page = 1;
        this.search();
      },
      search() {
        this.loading = true;
        stackoverflow.search(this.input, this.page).then(response => {
          this.tableData = transformData(response.data);
          this.loading = false;
          this.hasMore = response.data.has_more;
        });
      },
      tableRowClassName({row, rowIndex}) {
        return row.is_answered ? 'answered' : '';
      },
      goTo(link){
        window.open(link, '_blank');
      },
      showMore() {
        this.page++;
        this.search();
      }
    },
    filters: {
      dateToString: function (value) {
        return new Date(value).toDateString()
      }
    }
  }
</script>

<style lang="scss">
  .el-table .answered {
    background-color: #f0f9eb;
  }
</style>
