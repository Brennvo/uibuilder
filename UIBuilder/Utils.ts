module UIBuilder {
    export function clone<T>(obj: T): T {
        let target = <T>{};
        for (var field in obj) {
            if (obj.hasOwnProperty(field)) {
                target[field] = obj[field];
            }
        }
        return target;
    }
}
