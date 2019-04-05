import Store from '../lib/store.js';

describe("Store", () => {
    let storeObj
    let connection;
    let sendToParent;
    let sendToParentError = function () {
      return Promise.reject("sample store error")
    }

    beforeEach(function() {

        sendToParent = function() {
            return Promise.resolve({  })
        }

        connection = { sendToParent: sendToParent }
        spyOn(connection, 'sendToParent').and.callThrough();
        storeObj = new Store(connection)
    });


    it("get", (done) => {
        storeObj.get('55').then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith('store', Object({ action: 'get', key: '55' }));
            done()
        })
    });

    it("get all", (done) => {
        storeObj.getAll().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith('store', Object({ action: 'getAll' }));
            done()
        })
    });

    it("set", (done) => {
        storeObj.set('key', 'value').then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith('store', Object({ action: 'set', key: 'key', value: 'value' }));
            done()
        })
    });

    it("remove", (done) => {
        storeObj.remove('55').then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith('store', Object({ action: 'remove', key: '55' }));
            done()
        })
    });

    it("clear", (done) => {
        storeObj.clear().then(() => {
            expect(connection.sendToParent).toHaveBeenCalledWith('store', Object({ action: 'clear' }));
            done()
        })
    });

    it("get invalid parameter", () => {
        try {
            storeObj.get()
        } catch (e) {
            expect(e.message).toEqual('Kindly provide valid parameters')
        }
    });


    it("set invalid parameter", () => {
        try {
            storeObj.set()
        } catch (e) {
            expect(e.message).toEqual('Kindly provide valid parameters')
        }
    });

    it("remove invalid parameter", () => {
        try {
            storeObj.remove()
        } catch (e) {
            expect(e.message).toEqual('Kindly provide valid parameters')
        }
    });

    it("errorCase", (done) => {
        let storeWithError = new Store({sendToParent: sendToParentError})
        storeWithError.remove('a','b').catch((e)=>{
          expect(e).toEqual('sample store error');
          done()
        })
    });
});