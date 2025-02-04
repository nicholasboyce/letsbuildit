const wrapPromise = (promise: Promise<any>) => {
    let status = "pending";
    let result = "";
    const suspender = promise.then(
      r => {
        status = "success";
        result = r;
      },
      e => {
        status = "error";
        result = e;
      }
    );
  
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        }
  
        return result;
      }
    };
};

const fetchJSON = () => fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json());

export const exportJSONTest = () => {
  return {
    result: wrapPromise(fetchJSON())
  }
};

