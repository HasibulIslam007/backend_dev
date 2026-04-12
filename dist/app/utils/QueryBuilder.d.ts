import { Query } from 'mongoose';
export declare class QueryBuilder<T> {
    modelQeury: Query<T[], T>;
    readonly query: Record<string, string>;
    constructor(modelQuery: Query<T[], T>, query: Record<string, string>);
    filter(): this;
    search(searchableFields: string[]): this;
    sort(): this;
    paginate(): this;
    build(): Query<T[], T>;
    getMeta(): Promise<{
        totalDocuments: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
//# sourceMappingURL=QueryBuilder.d.ts.map