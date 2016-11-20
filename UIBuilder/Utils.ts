namespace UIBuilder {
    export function clone<T>(obj: T): T {
        let target = <T>{};
        for (const field in obj) {
            if (obj.hasOwnProperty(field)) {
                target[field] = obj[field];
            }
        }
        return target;
    }
}
