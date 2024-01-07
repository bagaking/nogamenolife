// noinspection JSCheckFunctionSignatures
import {GetBridge} from "%/framework/vm/types"

console.log('__BKFW Loaded:', GetBridge().id() , GetBridge());
GetBridge().on('test111', (ctx, ...data) => console.log(ctx, ...data));
