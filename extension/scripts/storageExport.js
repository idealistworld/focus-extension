class LocalStorage {
    load(name, callback, callbackIsUndefined) {
        chrome.storage.local.get(name, function(item) {
            if (item[name] !== undefined) {
                var result = item[name];
                if (result !== undefined)
                    callback(result);
            } else {
                if (callbackIsUndefined !== undefined)
                    callbackIsUndefined();
            }
        });
    }

    save(name, value) {
        chrome.storage.local.set({
            [name]: value
        });
    }

    getMemoryUse(name, callback) {
        chrome.storage.local.getBytesInUse(name, function(item) {
            if (item !== undefined) {
                callback(item[name]);
            }
        });
    };

    test() {
        console.log("imported")
    }
}