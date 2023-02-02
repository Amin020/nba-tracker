export interface MapperInterface<T> {

    fromJson(json: any, ...x: any): T;

    fromList(jsonList: Array<any>, ...x: any): Array<T>;

}