import * as express from 'express';
export declare type Path = string | RegExp | {
    url: string | RegExp;
    method?: string;
    methods?: string | string[];
};
export declare type Params = {
    method?: string | string[];
    path?: Path | Path[];
    ext?: string | string[];
    useOriginalUrl?: boolean;
} | ((req: express.Request) => boolean);
export declare function unless(options: Params): {
    (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
    unless: typeof unless;
};