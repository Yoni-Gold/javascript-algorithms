
export default class prioQueue {
  constructor() {
      this.data = {indexes: []};
  }

  add(item , priority) 
  {
      if (this.hasValue(item))
      {
        return null;
      }

      if (!this.data[priority]) 
      {
          this.data[priority] = [];

          if (this.data.indexes.length === 0)
          {
              this.data.indexes.push(priority);
          }

          else
          {
              let inserted = false;
          
              this.data.indexes.forEach((element, index) => {
                  if (element > priority && !inserted)
                  {
                      this.data.indexes.splice(index, 0, priority);
                      inserted = true;
                  }      
              });

              if (!inserted) 
              {
                  this.data.indexes.push(priority);
              }
          }
      }

      this.data[priority].push(item);
  }

  poll() 
  {
      if (this.data.indexes.length > 0)
      {
          let removed = this.data[this.data.indexes[0]].shift();
          if (!this.data[this.data.indexes[0]][0])
          {
              delete this.data[this.data.indexes.shift()];
          }
          return removed;
      }

      else return null;
  }

  get() 
  {
      let queue = [];
      for (let index of this.data.indexes)
      {
          queue = queue.concat(this.data[index]);
      }
      return queue;
  }

  peek()
  {
      if (this.data.indexes.length > 0)
      {
          return this.data[this.data.indexes[0]][0];
      }

      else return null;
  }

  hasValue(value) 
  {
      for (let priority of this.data.indexes)
      {
        if (this.data[priority].indexOf(value) !== -1)
        {
          return true;
        }
      }
  
      return false;
  }

  changePriority(value, priority) 
  {
        for (let index of this.data.indexes)
        {
            this.data[index] = this.data[index].filter(v => v !== value);
            if (this.data[index].length === 0)
            {
                this.data.indexes = this.data.indexes.filter(v => v !== index);
                delete this.data[index];
            }
        }
        this.add(value, priority);
  }
}