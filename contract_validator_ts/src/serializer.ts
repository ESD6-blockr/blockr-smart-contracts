export class Serialize {
     serialize(data: Object) {

     }

     deserialize(data: string) {

          let parsedJSON = JSON.parse(data)

          console.log(parsedJSON.function.functionName);
          console.log(new Date());

          console.log(typeof parsedJSON.classTemplate.contract);
          console.log(parsedJSON.classTemplate.contract);


          // let Contract = parsedJSON.classTemplate.contract;
          // var myObject = new this[parsedJSON.classTemplate.contract]();
          // let instance = new Contract();

          // var global;
          // try {
          //      global = Function('return this')() || (42, eval)('this');
          // } catch (e) {
          //      global = window;
          // }

          // // and then
          // var obj = new global[parsedJSON.classTemplate.contract]

          // this.stringToObject(parsedJSON.classTemplate.contract, "object")

          var myObject = eval("new " + parsedJSON.classTemplate.contract + "()");

          return parsedJSON;

          // if (parsedJSON.functionName && parsedJSON.functionParameters && parsedJSON.contract) {
          //      return parsedJSON;
          // }
     }

     stringToObject(str, type) {
          type = type || "object";  // can pass "function"
          var arr = str.split(".");
      
          var fn = (window || this);
          for (var i = 0, len = arr.length; i < len; i++) {
              fn = fn[arr[i]];
          }
          if (typeof fn !== type) {
              throw new Error(type +" not found: " + str);
          }
      
          return  fn;
      };
}