
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model ItemImage
 * 
 */
export type ItemImage = $Result.DefaultSelection<Prisma.$ItemImagePayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model TradeItem
 * 
 */
export type TradeItem = $Result.DefaultSelection<Prisma.$TradeItemPayload>
/**
 * Model Favorite
 * 
 */
export type Favorite = $Result.DefaultSelection<Prisma.$FavoritePayload>
/**
 * Model MessageRoom
 * 
 */
export type MessageRoom = $Result.DefaultSelection<Prisma.$MessageRoomPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Interaction
 * 
 */
export type Interaction = $Result.DefaultSelection<Prisma.$InteractionPayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs>;

  /**
   * `prisma.itemImage`: Exposes CRUD operations for the **ItemImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemImages
    * const itemImages = await prisma.itemImage.findMany()
    * ```
    */
  get itemImage(): Prisma.ItemImageDelegate<ExtArgs>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs>;

  /**
   * `prisma.tradeItem`: Exposes CRUD operations for the **TradeItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeItems
    * const tradeItems = await prisma.tradeItem.findMany()
    * ```
    */
  get tradeItem(): Prisma.TradeItemDelegate<ExtArgs>;

  /**
   * `prisma.favorite`: Exposes CRUD operations for the **Favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favorites
    * const favorites = await prisma.favorite.findMany()
    * ```
    */
  get favorite(): Prisma.FavoriteDelegate<ExtArgs>;

  /**
   * `prisma.messageRoom`: Exposes CRUD operations for the **MessageRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MessageRooms
    * const messageRooms = await prisma.messageRoom.findMany()
    * ```
    */
  get messageRoom(): Prisma.MessageRoomDelegate<ExtArgs>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.address`: Exposes CRUD operations for the **Address** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Addresses
    * const addresses = await prisma.address.findMany()
    * ```
    */
  get address(): Prisma.AddressDelegate<ExtArgs>;

  /**
   * `prisma.interaction`: Exposes CRUD operations for the **Interaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Interactions
    * const interactions = await prisma.interaction.findMany()
    * ```
    */
  get interaction(): Prisma.InteractionDelegate<ExtArgs>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Profile: 'Profile',
    Category: 'Category',
    Item: 'Item',
    ItemImage: 'ItemImage',
    Trade: 'Trade',
    TradeItem: 'TradeItem',
    Favorite: 'Favorite',
    MessageRoom: 'MessageRoom',
    Message: 'Message',
    Notification: 'Notification',
    Address: 'Address',
    Interaction: 'Interaction',
    Setting: 'Setting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "profile" | "category" | "item" | "itemImage" | "trade" | "tradeItem" | "favorite" | "messageRoom" | "message" | "notification" | "address" | "interaction" | "setting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      ItemImage: {
        payload: Prisma.$ItemImagePayload<ExtArgs>
        fields: Prisma.ItemImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>
          }
          findFirst: {
            args: Prisma.ItemImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>
          }
          findMany: {
            args: Prisma.ItemImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>[]
          }
          create: {
            args: Prisma.ItemImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>
          }
          createMany: {
            args: Prisma.ItemImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>[]
          }
          delete: {
            args: Prisma.ItemImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>
          }
          update: {
            args: Prisma.ItemImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>
          }
          deleteMany: {
            args: Prisma.ItemImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemImagePayload>
          }
          aggregate: {
            args: Prisma.ItemImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemImage>
          }
          groupBy: {
            args: Prisma.ItemImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemImageCountArgs<ExtArgs>
            result: $Utils.Optional<ItemImageCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      TradeItem: {
        payload: Prisma.$TradeItemPayload<ExtArgs>
        fields: Prisma.TradeItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>
          }
          findFirst: {
            args: Prisma.TradeItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>
          }
          findMany: {
            args: Prisma.TradeItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>[]
          }
          create: {
            args: Prisma.TradeItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>
          }
          createMany: {
            args: Prisma.TradeItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>[]
          }
          delete: {
            args: Prisma.TradeItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>
          }
          update: {
            args: Prisma.TradeItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>
          }
          deleteMany: {
            args: Prisma.TradeItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TradeItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeItemPayload>
          }
          aggregate: {
            args: Prisma.TradeItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeItem>
          }
          groupBy: {
            args: Prisma.TradeItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeItemCountArgs<ExtArgs>
            result: $Utils.Optional<TradeItemCountAggregateOutputType> | number
          }
        }
      }
      Favorite: {
        payload: Prisma.$FavoritePayload<ExtArgs>
        fields: Prisma.FavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findFirst: {
            args: Prisma.FavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          findMany: {
            args: Prisma.FavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          create: {
            args: Prisma.FavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          createMany: {
            args: Prisma.FavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>[]
          }
          delete: {
            args: Prisma.FavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          update: {
            args: Prisma.FavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          deleteMany: {
            args: Prisma.FavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FavoritePayload>
          }
          aggregate: {
            args: Prisma.FavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFavorite>
          }
          groupBy: {
            args: Prisma.FavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<FavoriteCountAggregateOutputType> | number
          }
        }
      }
      MessageRoom: {
        payload: Prisma.$MessageRoomPayload<ExtArgs>
        fields: Prisma.MessageRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>
          }
          findFirst: {
            args: Prisma.MessageRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>
          }
          findMany: {
            args: Prisma.MessageRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>[]
          }
          create: {
            args: Prisma.MessageRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>
          }
          createMany: {
            args: Prisma.MessageRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>[]
          }
          delete: {
            args: Prisma.MessageRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>
          }
          update: {
            args: Prisma.MessageRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>
          }
          deleteMany: {
            args: Prisma.MessageRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessageRoomPayload>
          }
          aggregate: {
            args: Prisma.MessageRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessageRoom>
          }
          groupBy: {
            args: Prisma.MessageRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageRoomCountArgs<ExtArgs>
            result: $Utils.Optional<MessageRoomCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Address: {
        payload: Prisma.$AddressPayload<ExtArgs>
        fields: Prisma.AddressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AddressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AddressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findFirst: {
            args: Prisma.AddressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AddressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          findMany: {
            args: Prisma.AddressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          create: {
            args: Prisma.AddressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          createMany: {
            args: Prisma.AddressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AddressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>[]
          }
          delete: {
            args: Prisma.AddressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          update: {
            args: Prisma.AddressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          deleteMany: {
            args: Prisma.AddressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AddressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AddressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AddressPayload>
          }
          aggregate: {
            args: Prisma.AddressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAddress>
          }
          groupBy: {
            args: Prisma.AddressGroupByArgs<ExtArgs>
            result: $Utils.Optional<AddressGroupByOutputType>[]
          }
          count: {
            args: Prisma.AddressCountArgs<ExtArgs>
            result: $Utils.Optional<AddressCountAggregateOutputType> | number
          }
        }
      }
      Interaction: {
        payload: Prisma.$InteractionPayload<ExtArgs>
        fields: Prisma.InteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>
          }
          findFirst: {
            args: Prisma.InteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>
          }
          findMany: {
            args: Prisma.InteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>[]
          }
          create: {
            args: Prisma.InteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>
          }
          createMany: {
            args: Prisma.InteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>[]
          }
          delete: {
            args: Prisma.InteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>
          }
          update: {
            args: Prisma.InteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>
          }
          deleteMany: {
            args: Prisma.InteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InteractionPayload>
          }
          aggregate: {
            args: Prisma.InteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInteraction>
          }
          groupBy: {
            args: Prisma.InteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InteractionCountArgs<ExtArgs>
            result: $Utils.Optional<InteractionCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    items: number
    sentTrades: number
    receivedTrades: number
    favorites: number
    sentMessages: number
    rooms1: number
    rooms2: number
    notifications: number
    addresses: number
    interactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | UserCountOutputTypeCountItemsArgs
    sentTrades?: boolean | UserCountOutputTypeCountSentTradesArgs
    receivedTrades?: boolean | UserCountOutputTypeCountReceivedTradesArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    rooms1?: boolean | UserCountOutputTypeCountRooms1Args
    rooms2?: boolean | UserCountOutputTypeCountRooms2Args
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    addresses?: boolean | UserCountOutputTypeCountAddressesArgs
    interactions?: boolean | UserCountOutputTypeCountInteractionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRooms1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageRoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRooms2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageRoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAddressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InteractionWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    items: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    items?: boolean | CategoryCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    images: number
    favorites: number
    tradeItems: number
    interactions: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | ItemCountOutputTypeCountImagesArgs
    favorites?: boolean | ItemCountOutputTypeCountFavoritesArgs
    tradeItems?: boolean | ItemCountOutputTypeCountTradeItemsArgs
    interactions?: boolean | ItemCountOutputTypeCountInteractionsArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemImageWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountTradeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeItemWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InteractionWhereInput
  }


  /**
   * Count Type TradeCountOutputType
   */

  export type TradeCountOutputType = {
    tradeItems: number
  }

  export type TradeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tradeItems?: boolean | TradeCountOutputTypeCountTradeItemsArgs
  }

  // Custom InputTypes
  /**
   * TradeCountOutputType without action
   */
  export type TradeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeCountOutputType
     */
    select?: TradeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TradeCountOutputType without action
   */
  export type TradeCountOutputTypeCountTradeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeItemWhereInput
  }


  /**
   * Count Type MessageRoomCountOutputType
   */

  export type MessageRoomCountOutputType = {
    messages: number
  }

  export type MessageRoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | MessageRoomCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * MessageRoomCountOutputType without action
   */
  export type MessageRoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoomCountOutputType
     */
    select?: MessageRoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MessageRoomCountOutputType without action
   */
  export type MessageRoomCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | User$profileArgs<ExtArgs>
    items?: boolean | User$itemsArgs<ExtArgs>
    sentTrades?: boolean | User$sentTradesArgs<ExtArgs>
    receivedTrades?: boolean | User$receivedTradesArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    rooms1?: boolean | User$rooms1Args<ExtArgs>
    rooms2?: boolean | User$rooms2Args<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    addresses?: boolean | User$addressesArgs<ExtArgs>
    interactions?: boolean | User$interactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | User$profileArgs<ExtArgs>
    items?: boolean | User$itemsArgs<ExtArgs>
    sentTrades?: boolean | User$sentTradesArgs<ExtArgs>
    receivedTrades?: boolean | User$receivedTradesArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    rooms1?: boolean | User$rooms1Args<ExtArgs>
    rooms2?: boolean | User$rooms2Args<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    addresses?: boolean | User$addressesArgs<ExtArgs>
    interactions?: boolean | User$interactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      profile: Prisma.$ProfilePayload<ExtArgs> | null
      items: Prisma.$ItemPayload<ExtArgs>[]
      sentTrades: Prisma.$TradePayload<ExtArgs>[]
      receivedTrades: Prisma.$TradePayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      rooms1: Prisma.$MessageRoomPayload<ExtArgs>[]
      rooms2: Prisma.$MessageRoomPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      addresses: Prisma.$AddressPayload<ExtArgs>[]
      interactions: Prisma.$InteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    items<T extends User$itemsArgs<ExtArgs> = {}>(args?: Subset<T, User$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany"> | Null>
    sentTrades<T extends User$sentTradesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentTradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany"> | Null>
    receivedTrades<T extends User$receivedTradesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedTradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany"> | Null>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany"> | Null>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    rooms1<T extends User$rooms1Args<ExtArgs> = {}>(args?: Subset<T, User$rooms1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findMany"> | Null>
    rooms2<T extends User$rooms2Args<ExtArgs> = {}>(args?: Subset<T, User$rooms2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    addresses<T extends User$addressesArgs<ExtArgs> = {}>(args?: Subset<T, User$addressesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany"> | Null>
    interactions<T extends User$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    where?: ProfileWhereInput
  }

  /**
   * User.items
   */
  export type User$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * User.sentTrades
   */
  export type User$sentTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * User.receivedTrades
   */
  export type User$receivedTradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    cursor?: TradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.rooms1
   */
  export type User$rooms1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    where?: MessageRoomWhereInput
    orderBy?: MessageRoomOrderByWithRelationInput | MessageRoomOrderByWithRelationInput[]
    cursor?: MessageRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageRoomScalarFieldEnum | MessageRoomScalarFieldEnum[]
  }

  /**
   * User.rooms2
   */
  export type User$rooms2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    where?: MessageRoomWhereInput
    orderBy?: MessageRoomOrderByWithRelationInput | MessageRoomOrderByWithRelationInput[]
    cursor?: MessageRoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageRoomScalarFieldEnum | MessageRoomScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.addresses
   */
  export type User$addressesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    cursor?: AddressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * User.interactions
   */
  export type User$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    where?: InteractionWhereInput
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[]
    cursor?: InteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    score: number | null
    rating: number | null
    swapsCompleted: number | null
  }

  export type ProfileSumAggregateOutputType = {
    score: number | null
    rating: number | null
    swapsCompleted: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    bio: string | null
    city: string | null
    phone: string | null
    isPremium: boolean | null
    premiumUntil: Date | null
    score: number | null
    rating: number | null
    swapsCompleted: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    firstName: string | null
    lastName: string | null
    avatarUrl: string | null
    bio: string | null
    city: string | null
    phone: string | null
    isPremium: boolean | null
    premiumUntil: Date | null
    score: number | null
    rating: number | null
    swapsCompleted: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    avatarUrl: number
    bio: number
    city: number
    phone: number
    isPremium: number
    premiumUntil: number
    score: number
    rating: number
    swapsCompleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    score?: true
    rating?: true
    swapsCompleted?: true
  }

  export type ProfileSumAggregateInputType = {
    score?: true
    rating?: true
    swapsCompleted?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    bio?: true
    city?: true
    phone?: true
    isPremium?: true
    premiumUntil?: true
    score?: true
    rating?: true
    swapsCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    bio?: true
    city?: true
    phone?: true
    isPremium?: true
    premiumUntil?: true
    score?: true
    rating?: true
    swapsCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    avatarUrl?: true
    bio?: true
    city?: true
    phone?: true
    isPremium?: true
    premiumUntil?: true
    score?: true
    rating?: true
    swapsCompleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    userId: string
    firstName: string
    lastName: string
    avatarUrl: string | null
    bio: string | null
    city: string | null
    phone: string | null
    isPremium: boolean
    premiumUntil: Date | null
    score: number
    rating: number
    swapsCompleted: number
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    city?: boolean
    phone?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    score?: boolean
    rating?: boolean
    swapsCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    city?: boolean
    phone?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    score?: boolean
    rating?: boolean
    swapsCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    avatarUrl?: boolean
    bio?: boolean
    city?: boolean
    phone?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    score?: boolean
    rating?: boolean
    swapsCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      firstName: string
      lastName: string
      avatarUrl: string | null
      bio: string | null
      city: string | null
      phone: string | null
      isPremium: boolean
      premiumUntil: Date | null
      score: number
      rating: number
      swapsCompleted: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */ 
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly userId: FieldRef<"Profile", 'String'>
    readonly firstName: FieldRef<"Profile", 'String'>
    readonly lastName: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly bio: FieldRef<"Profile", 'String'>
    readonly city: FieldRef<"Profile", 'String'>
    readonly phone: FieldRef<"Profile", 'String'>
    readonly isPremium: FieldRef<"Profile", 'Boolean'>
    readonly premiumUntil: FieldRef<"Profile", 'DateTime'>
    readonly score: FieldRef<"Profile", 'Int'>
    readonly rating: FieldRef<"Profile", 'Float'>
    readonly swapsCompleted: FieldRef<"Profile", 'Int'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    icon: string | null
    description: string | null
    parentId: string | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    icon: string | null
    description: string | null
    parentId: string | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    icon: number
    description: number
    parentId: number
    createdAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    description?: true
    parentId?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    description?: true
    parentId?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    icon?: true
    description?: true
    parentId?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    icon: string | null
    description: string | null
    parentId: string | null
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    items?: boolean | Category$itemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    icon?: boolean
    description?: boolean
    parentId?: boolean
    createdAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    items?: boolean | Category$itemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      items: Prisma.$ItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      icon: string | null
      description: string | null
      parentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null>
    items<T extends Category$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Category$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly icon: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly parentId: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.items
   */
  export type Category$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    estimatedValue: number | null
    viewCount: number | null
    qualityScore: number | null
  }

  export type ItemSumAggregateOutputType = {
    estimatedValue: number | null
    viewCount: number | null
    qualityScore: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: string | null
    userId: string | null
    categoryId: string | null
    title: string | null
    description: string | null
    condition: string | null
    estimatedValue: number | null
    location: string | null
    status: string | null
    isFeatured: boolean | null
    isPopular: boolean | null
    viewCount: number | null
    qualityScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    categoryId: string | null
    title: string | null
    description: string | null
    condition: string | null
    estimatedValue: number | null
    location: string | null
    status: string | null
    isFeatured: boolean | null
    isPopular: boolean | null
    viewCount: number | null
    qualityScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    userId: number
    categoryId: number
    title: number
    description: number
    condition: number
    estimatedValue: number
    location: number
    status: number
    isFeatured: number
    isPopular: number
    viewCount: number
    qualityScore: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    estimatedValue?: true
    viewCount?: true
    qualityScore?: true
  }

  export type ItemSumAggregateInputType = {
    estimatedValue?: true
    viewCount?: true
    qualityScore?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
    title?: true
    description?: true
    condition?: true
    estimatedValue?: true
    location?: true
    status?: true
    isFeatured?: true
    isPopular?: true
    viewCount?: true
    qualityScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
    title?: true
    description?: true
    condition?: true
    estimatedValue?: true
    location?: true
    status?: true
    isFeatured?: true
    isPopular?: true
    viewCount?: true
    qualityScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    userId?: true
    categoryId?: true
    title?: true
    description?: true
    condition?: true
    estimatedValue?: true
    location?: true
    status?: true
    isFeatured?: true
    isPopular?: true
    viewCount?: true
    qualityScore?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: string
    userId: string
    categoryId: string
    title: string
    description: string | null
    condition: string
    estimatedValue: number | null
    location: string | null
    status: string
    isFeatured: boolean
    isPopular: boolean
    viewCount: number
    qualityScore: number
    createdAt: Date
    updatedAt: Date
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    title?: boolean
    description?: boolean
    condition?: boolean
    estimatedValue?: boolean
    location?: boolean
    status?: boolean
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: boolean
    qualityScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    images?: boolean | Item$imagesArgs<ExtArgs>
    favorites?: boolean | Item$favoritesArgs<ExtArgs>
    tradeItems?: boolean | Item$tradeItemsArgs<ExtArgs>
    interactions?: boolean | Item$interactionsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    title?: boolean
    description?: boolean
    condition?: boolean
    estimatedValue?: boolean
    location?: boolean
    status?: boolean
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: boolean
    qualityScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    id?: boolean
    userId?: boolean
    categoryId?: boolean
    title?: boolean
    description?: boolean
    condition?: boolean
    estimatedValue?: boolean
    location?: boolean
    status?: boolean
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: boolean
    qualityScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    images?: boolean | Item$imagesArgs<ExtArgs>
    favorites?: boolean | Item$favoritesArgs<ExtArgs>
    tradeItems?: boolean | Item$tradeItemsArgs<ExtArgs>
    interactions?: boolean | Item$interactionsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
      images: Prisma.$ItemImagePayload<ExtArgs>[]
      favorites: Prisma.$FavoritePayload<ExtArgs>[]
      tradeItems: Prisma.$TradeItemPayload<ExtArgs>[]
      interactions: Prisma.$InteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      categoryId: string
      title: string
      description: string | null
      condition: string
      estimatedValue: number | null
      location: string | null
      status: string
      isFeatured: boolean
      isPopular: boolean
      viewCount: number
      qualityScore: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    images<T extends Item$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Item$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "findMany"> | Null>
    favorites<T extends Item$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Item$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany"> | Null>
    tradeItems<T extends Item$tradeItemsArgs<ExtArgs> = {}>(args?: Subset<T, Item$tradeItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findMany"> | Null>
    interactions<T extends Item$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, Item$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */ 
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'String'>
    readonly userId: FieldRef<"Item", 'String'>
    readonly categoryId: FieldRef<"Item", 'String'>
    readonly title: FieldRef<"Item", 'String'>
    readonly description: FieldRef<"Item", 'String'>
    readonly condition: FieldRef<"Item", 'String'>
    readonly estimatedValue: FieldRef<"Item", 'Float'>
    readonly location: FieldRef<"Item", 'String'>
    readonly status: FieldRef<"Item", 'String'>
    readonly isFeatured: FieldRef<"Item", 'Boolean'>
    readonly isPopular: FieldRef<"Item", 'Boolean'>
    readonly viewCount: FieldRef<"Item", 'Int'>
    readonly qualityScore: FieldRef<"Item", 'Float'>
    readonly createdAt: FieldRef<"Item", 'DateTime'>
    readonly updatedAt: FieldRef<"Item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
  }

  /**
   * Item.images
   */
  export type Item$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    where?: ItemImageWhereInput
    orderBy?: ItemImageOrderByWithRelationInput | ItemImageOrderByWithRelationInput[]
    cursor?: ItemImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemImageScalarFieldEnum | ItemImageScalarFieldEnum[]
  }

  /**
   * Item.favorites
   */
  export type Item$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    cursor?: FavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Item.tradeItems
   */
  export type Item$tradeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    where?: TradeItemWhereInput
    orderBy?: TradeItemOrderByWithRelationInput | TradeItemOrderByWithRelationInput[]
    cursor?: TradeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeItemScalarFieldEnum | TradeItemScalarFieldEnum[]
  }

  /**
   * Item.interactions
   */
  export type Item$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    where?: InteractionWhereInput
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[]
    cursor?: InteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model ItemImage
   */

  export type AggregateItemImage = {
    _count: ItemImageCountAggregateOutputType | null
    _avg: ItemImageAvgAggregateOutputType | null
    _sum: ItemImageSumAggregateOutputType | null
    _min: ItemImageMinAggregateOutputType | null
    _max: ItemImageMaxAggregateOutputType | null
  }

  export type ItemImageAvgAggregateOutputType = {
    displayOrder: number | null
  }

  export type ItemImageSumAggregateOutputType = {
    displayOrder: number | null
  }

  export type ItemImageMinAggregateOutputType = {
    id: string | null
    itemId: string | null
    imageUrl: string | null
    isPrimary: boolean | null
    displayOrder: number | null
    createdAt: Date | null
  }

  export type ItemImageMaxAggregateOutputType = {
    id: string | null
    itemId: string | null
    imageUrl: string | null
    isPrimary: boolean | null
    displayOrder: number | null
    createdAt: Date | null
  }

  export type ItemImageCountAggregateOutputType = {
    id: number
    itemId: number
    imageUrl: number
    isPrimary: number
    displayOrder: number
    createdAt: number
    _all: number
  }


  export type ItemImageAvgAggregateInputType = {
    displayOrder?: true
  }

  export type ItemImageSumAggregateInputType = {
    displayOrder?: true
  }

  export type ItemImageMinAggregateInputType = {
    id?: true
    itemId?: true
    imageUrl?: true
    isPrimary?: true
    displayOrder?: true
    createdAt?: true
  }

  export type ItemImageMaxAggregateInputType = {
    id?: true
    itemId?: true
    imageUrl?: true
    isPrimary?: true
    displayOrder?: true
    createdAt?: true
  }

  export type ItemImageCountAggregateInputType = {
    id?: true
    itemId?: true
    imageUrl?: true
    isPrimary?: true
    displayOrder?: true
    createdAt?: true
    _all?: true
  }

  export type ItemImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemImage to aggregate.
     */
    where?: ItemImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemImages to fetch.
     */
    orderBy?: ItemImageOrderByWithRelationInput | ItemImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemImages
    **/
    _count?: true | ItemImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemImageMaxAggregateInputType
  }

  export type GetItemImageAggregateType<T extends ItemImageAggregateArgs> = {
        [P in keyof T & keyof AggregateItemImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemImage[P]>
      : GetScalarType<T[P], AggregateItemImage[P]>
  }




  export type ItemImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemImageWhereInput
    orderBy?: ItemImageOrderByWithAggregationInput | ItemImageOrderByWithAggregationInput[]
    by: ItemImageScalarFieldEnum[] | ItemImageScalarFieldEnum
    having?: ItemImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemImageCountAggregateInputType | true
    _avg?: ItemImageAvgAggregateInputType
    _sum?: ItemImageSumAggregateInputType
    _min?: ItemImageMinAggregateInputType
    _max?: ItemImageMaxAggregateInputType
  }

  export type ItemImageGroupByOutputType = {
    id: string
    itemId: string
    imageUrl: string
    isPrimary: boolean
    displayOrder: number
    createdAt: Date
    _count: ItemImageCountAggregateOutputType | null
    _avg: ItemImageAvgAggregateOutputType | null
    _sum: ItemImageSumAggregateOutputType | null
    _min: ItemImageMinAggregateOutputType | null
    _max: ItemImageMaxAggregateOutputType | null
  }

  type GetItemImageGroupByPayload<T extends ItemImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemImageGroupByOutputType[P]>
            : GetScalarType<T[P], ItemImageGroupByOutputType[P]>
        }
      >
    >


  export type ItemImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    imageUrl?: boolean
    isPrimary?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemImage"]>

  export type ItemImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemId?: boolean
    imageUrl?: boolean
    isPrimary?: boolean
    displayOrder?: boolean
    createdAt?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemImage"]>

  export type ItemImageSelectScalar = {
    id?: boolean
    itemId?: boolean
    imageUrl?: boolean
    isPrimary?: boolean
    displayOrder?: boolean
    createdAt?: boolean
  }

  export type ItemImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type ItemImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $ItemImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemImage"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      itemId: string
      imageUrl: string
      isPrimary: boolean
      displayOrder: number
      createdAt: Date
    }, ExtArgs["result"]["itemImage"]>
    composites: {}
  }

  type ItemImageGetPayload<S extends boolean | null | undefined | ItemImageDefaultArgs> = $Result.GetResult<Prisma.$ItemImagePayload, S>

  type ItemImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ItemImageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ItemImageCountAggregateInputType | true
    }

  export interface ItemImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemImage'], meta: { name: 'ItemImage' } }
    /**
     * Find zero or one ItemImage that matches the filter.
     * @param {ItemImageFindUniqueArgs} args - Arguments to find a ItemImage
     * @example
     * // Get one ItemImage
     * const itemImage = await prisma.itemImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemImageFindUniqueArgs>(args: SelectSubset<T, ItemImageFindUniqueArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ItemImage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ItemImageFindUniqueOrThrowArgs} args - Arguments to find a ItemImage
     * @example
     * // Get one ItemImage
     * const itemImage = await prisma.itemImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemImageFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ItemImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageFindFirstArgs} args - Arguments to find a ItemImage
     * @example
     * // Get one ItemImage
     * const itemImage = await prisma.itemImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemImageFindFirstArgs>(args?: SelectSubset<T, ItemImageFindFirstArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ItemImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageFindFirstOrThrowArgs} args - Arguments to find a ItemImage
     * @example
     * // Get one ItemImage
     * const itemImage = await prisma.itemImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemImageFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ItemImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemImages
     * const itemImages = await prisma.itemImage.findMany()
     * 
     * // Get first 10 ItemImages
     * const itemImages = await prisma.itemImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemImageWithIdOnly = await prisma.itemImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemImageFindManyArgs>(args?: SelectSubset<T, ItemImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ItemImage.
     * @param {ItemImageCreateArgs} args - Arguments to create a ItemImage.
     * @example
     * // Create one ItemImage
     * const ItemImage = await prisma.itemImage.create({
     *   data: {
     *     // ... data to create a ItemImage
     *   }
     * })
     * 
     */
    create<T extends ItemImageCreateArgs>(args: SelectSubset<T, ItemImageCreateArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ItemImages.
     * @param {ItemImageCreateManyArgs} args - Arguments to create many ItemImages.
     * @example
     * // Create many ItemImages
     * const itemImage = await prisma.itemImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemImageCreateManyArgs>(args?: SelectSubset<T, ItemImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemImages and returns the data saved in the database.
     * @param {ItemImageCreateManyAndReturnArgs} args - Arguments to create many ItemImages.
     * @example
     * // Create many ItemImages
     * const itemImage = await prisma.itemImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemImages and only return the `id`
     * const itemImageWithIdOnly = await prisma.itemImage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemImageCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ItemImage.
     * @param {ItemImageDeleteArgs} args - Arguments to delete one ItemImage.
     * @example
     * // Delete one ItemImage
     * const ItemImage = await prisma.itemImage.delete({
     *   where: {
     *     // ... filter to delete one ItemImage
     *   }
     * })
     * 
     */
    delete<T extends ItemImageDeleteArgs>(args: SelectSubset<T, ItemImageDeleteArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ItemImage.
     * @param {ItemImageUpdateArgs} args - Arguments to update one ItemImage.
     * @example
     * // Update one ItemImage
     * const itemImage = await prisma.itemImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemImageUpdateArgs>(args: SelectSubset<T, ItemImageUpdateArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ItemImages.
     * @param {ItemImageDeleteManyArgs} args - Arguments to filter ItemImages to delete.
     * @example
     * // Delete a few ItemImages
     * const { count } = await prisma.itemImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemImageDeleteManyArgs>(args?: SelectSubset<T, ItemImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemImages
     * const itemImage = await prisma.itemImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemImageUpdateManyArgs>(args: SelectSubset<T, ItemImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemImage.
     * @param {ItemImageUpsertArgs} args - Arguments to update or create a ItemImage.
     * @example
     * // Update or create a ItemImage
     * const itemImage = await prisma.itemImage.upsert({
     *   create: {
     *     // ... data to create a ItemImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemImage we want to update
     *   }
     * })
     */
    upsert<T extends ItemImageUpsertArgs>(args: SelectSubset<T, ItemImageUpsertArgs<ExtArgs>>): Prisma__ItemImageClient<$Result.GetResult<Prisma.$ItemImagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ItemImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageCountArgs} args - Arguments to filter ItemImages to count.
     * @example
     * // Count the number of ItemImages
     * const count = await prisma.itemImage.count({
     *   where: {
     *     // ... the filter for the ItemImages we want to count
     *   }
     * })
    **/
    count<T extends ItemImageCountArgs>(
      args?: Subset<T, ItemImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemImageAggregateArgs>(args: Subset<T, ItemImageAggregateArgs>): Prisma.PrismaPromise<GetItemImageAggregateType<T>>

    /**
     * Group by ItemImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemImageGroupByArgs['orderBy'] }
        : { orderBy?: ItemImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemImage model
   */
  readonly fields: ItemImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemImage model
   */ 
  interface ItemImageFieldRefs {
    readonly id: FieldRef<"ItemImage", 'String'>
    readonly itemId: FieldRef<"ItemImage", 'String'>
    readonly imageUrl: FieldRef<"ItemImage", 'String'>
    readonly isPrimary: FieldRef<"ItemImage", 'Boolean'>
    readonly displayOrder: FieldRef<"ItemImage", 'Int'>
    readonly createdAt: FieldRef<"ItemImage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemImage findUnique
   */
  export type ItemImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * Filter, which ItemImage to fetch.
     */
    where: ItemImageWhereUniqueInput
  }

  /**
   * ItemImage findUniqueOrThrow
   */
  export type ItemImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * Filter, which ItemImage to fetch.
     */
    where: ItemImageWhereUniqueInput
  }

  /**
   * ItemImage findFirst
   */
  export type ItemImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * Filter, which ItemImage to fetch.
     */
    where?: ItemImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemImages to fetch.
     */
    orderBy?: ItemImageOrderByWithRelationInput | ItemImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemImages.
     */
    cursor?: ItemImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemImages.
     */
    distinct?: ItemImageScalarFieldEnum | ItemImageScalarFieldEnum[]
  }

  /**
   * ItemImage findFirstOrThrow
   */
  export type ItemImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * Filter, which ItemImage to fetch.
     */
    where?: ItemImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemImages to fetch.
     */
    orderBy?: ItemImageOrderByWithRelationInput | ItemImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemImages.
     */
    cursor?: ItemImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemImages.
     */
    distinct?: ItemImageScalarFieldEnum | ItemImageScalarFieldEnum[]
  }

  /**
   * ItemImage findMany
   */
  export type ItemImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * Filter, which ItemImages to fetch.
     */
    where?: ItemImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemImages to fetch.
     */
    orderBy?: ItemImageOrderByWithRelationInput | ItemImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemImages.
     */
    cursor?: ItemImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemImages.
     */
    skip?: number
    distinct?: ItemImageScalarFieldEnum | ItemImageScalarFieldEnum[]
  }

  /**
   * ItemImage create
   */
  export type ItemImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemImage.
     */
    data: XOR<ItemImageCreateInput, ItemImageUncheckedCreateInput>
  }

  /**
   * ItemImage createMany
   */
  export type ItemImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemImages.
     */
    data: ItemImageCreateManyInput | ItemImageCreateManyInput[]
  }

  /**
   * ItemImage createManyAndReturn
   */
  export type ItemImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ItemImages.
     */
    data: ItemImageCreateManyInput | ItemImageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemImage update
   */
  export type ItemImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemImage.
     */
    data: XOR<ItemImageUpdateInput, ItemImageUncheckedUpdateInput>
    /**
     * Choose, which ItemImage to update.
     */
    where: ItemImageWhereUniqueInput
  }

  /**
   * ItemImage updateMany
   */
  export type ItemImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemImages.
     */
    data: XOR<ItemImageUpdateManyMutationInput, ItemImageUncheckedUpdateManyInput>
    /**
     * Filter which ItemImages to update
     */
    where?: ItemImageWhereInput
  }

  /**
   * ItemImage upsert
   */
  export type ItemImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemImage to update in case it exists.
     */
    where: ItemImageWhereUniqueInput
    /**
     * In case the ItemImage found by the `where` argument doesn't exist, create a new ItemImage with this data.
     */
    create: XOR<ItemImageCreateInput, ItemImageUncheckedCreateInput>
    /**
     * In case the ItemImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemImageUpdateInput, ItemImageUncheckedUpdateInput>
  }

  /**
   * ItemImage delete
   */
  export type ItemImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
    /**
     * Filter which ItemImage to delete.
     */
    where: ItemImageWhereUniqueInput
  }

  /**
   * ItemImage deleteMany
   */
  export type ItemImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemImages to delete
     */
    where?: ItemImageWhereInput
  }

  /**
   * ItemImage without action
   */
  export type ItemImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemImage
     */
    select?: ItemImageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemImageInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    status: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    status: string | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    status: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TradeMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    senderId: string
    receiverId: string
    status: string
    message: string | null
    createdAt: Date
    updatedAt: Date
    _count: TradeCountAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    tradeItems?: boolean | Trade$tradeItemsArgs<ExtArgs>
    _count?: boolean | TradeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
    tradeItems?: boolean | Trade$tradeItemsArgs<ExtArgs>
    _count?: boolean | TradeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
      tradeItems: Prisma.$TradeItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      senderId: string
      receiverId: string
      status: string
      message: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tradeItems<T extends Trade$tradeItemsArgs<ExtArgs> = {}>(args?: Subset<T, Trade$tradeItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */ 
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly senderId: FieldRef<"Trade", 'String'>
    readonly receiverId: FieldRef<"Trade", 'String'>
    readonly status: FieldRef<"Trade", 'String'>
    readonly message: FieldRef<"Trade", 'String'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
    readonly updatedAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
  }

  /**
   * Trade.tradeItems
   */
  export type Trade$tradeItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    where?: TradeItemWhereInput
    orderBy?: TradeItemOrderByWithRelationInput | TradeItemOrderByWithRelationInput[]
    cursor?: TradeItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeItemScalarFieldEnum | TradeItemScalarFieldEnum[]
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeInclude<ExtArgs> | null
  }


  /**
   * Model TradeItem
   */

  export type AggregateTradeItem = {
    _count: TradeItemCountAggregateOutputType | null
    _min: TradeItemMinAggregateOutputType | null
    _max: TradeItemMaxAggregateOutputType | null
  }

  export type TradeItemMinAggregateOutputType = {
    id: string | null
    tradeId: string | null
    itemId: string | null
    side: string | null
  }

  export type TradeItemMaxAggregateOutputType = {
    id: string | null
    tradeId: string | null
    itemId: string | null
    side: string | null
  }

  export type TradeItemCountAggregateOutputType = {
    id: number
    tradeId: number
    itemId: number
    side: number
    _all: number
  }


  export type TradeItemMinAggregateInputType = {
    id?: true
    tradeId?: true
    itemId?: true
    side?: true
  }

  export type TradeItemMaxAggregateInputType = {
    id?: true
    tradeId?: true
    itemId?: true
    side?: true
  }

  export type TradeItemCountAggregateInputType = {
    id?: true
    tradeId?: true
    itemId?: true
    side?: true
    _all?: true
  }

  export type TradeItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeItem to aggregate.
     */
    where?: TradeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeItems to fetch.
     */
    orderBy?: TradeItemOrderByWithRelationInput | TradeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeItems
    **/
    _count?: true | TradeItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeItemMaxAggregateInputType
  }

  export type GetTradeItemAggregateType<T extends TradeItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeItem[P]>
      : GetScalarType<T[P], AggregateTradeItem[P]>
  }




  export type TradeItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeItemWhereInput
    orderBy?: TradeItemOrderByWithAggregationInput | TradeItemOrderByWithAggregationInput[]
    by: TradeItemScalarFieldEnum[] | TradeItemScalarFieldEnum
    having?: TradeItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeItemCountAggregateInputType | true
    _min?: TradeItemMinAggregateInputType
    _max?: TradeItemMaxAggregateInputType
  }

  export type TradeItemGroupByOutputType = {
    id: string
    tradeId: string
    itemId: string
    side: string
    _count: TradeItemCountAggregateOutputType | null
    _min: TradeItemMinAggregateOutputType | null
    _max: TradeItemMaxAggregateOutputType | null
  }

  type GetTradeItemGroupByPayload<T extends TradeItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeItemGroupByOutputType[P]>
            : GetScalarType<T[P], TradeItemGroupByOutputType[P]>
        }
      >
    >


  export type TradeItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tradeId?: boolean
    itemId?: boolean
    side?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeItem"]>

  export type TradeItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tradeId?: boolean
    itemId?: boolean
    side?: boolean
    trade?: boolean | TradeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeItem"]>

  export type TradeItemSelectScalar = {
    id?: boolean
    tradeId?: boolean
    itemId?: boolean
    side?: boolean
  }

  export type TradeItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type TradeItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    trade?: boolean | TradeDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $TradeItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeItem"
    objects: {
      trade: Prisma.$TradePayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tradeId: string
      itemId: string
      side: string
    }, ExtArgs["result"]["tradeItem"]>
    composites: {}
  }

  type TradeItemGetPayload<S extends boolean | null | undefined | TradeItemDefaultArgs> = $Result.GetResult<Prisma.$TradeItemPayload, S>

  type TradeItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TradeItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TradeItemCountAggregateInputType | true
    }

  export interface TradeItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeItem'], meta: { name: 'TradeItem' } }
    /**
     * Find zero or one TradeItem that matches the filter.
     * @param {TradeItemFindUniqueArgs} args - Arguments to find a TradeItem
     * @example
     * // Get one TradeItem
     * const tradeItem = await prisma.tradeItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeItemFindUniqueArgs>(args: SelectSubset<T, TradeItemFindUniqueArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TradeItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TradeItemFindUniqueOrThrowArgs} args - Arguments to find a TradeItem
     * @example
     * // Get one TradeItem
     * const tradeItem = await prisma.tradeItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeItemFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TradeItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemFindFirstArgs} args - Arguments to find a TradeItem
     * @example
     * // Get one TradeItem
     * const tradeItem = await prisma.tradeItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeItemFindFirstArgs>(args?: SelectSubset<T, TradeItemFindFirstArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TradeItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemFindFirstOrThrowArgs} args - Arguments to find a TradeItem
     * @example
     * // Get one TradeItem
     * const tradeItem = await prisma.tradeItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeItemFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TradeItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeItems
     * const tradeItems = await prisma.tradeItem.findMany()
     * 
     * // Get first 10 TradeItems
     * const tradeItems = await prisma.tradeItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeItemWithIdOnly = await prisma.tradeItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeItemFindManyArgs>(args?: SelectSubset<T, TradeItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TradeItem.
     * @param {TradeItemCreateArgs} args - Arguments to create a TradeItem.
     * @example
     * // Create one TradeItem
     * const TradeItem = await prisma.tradeItem.create({
     *   data: {
     *     // ... data to create a TradeItem
     *   }
     * })
     * 
     */
    create<T extends TradeItemCreateArgs>(args: SelectSubset<T, TradeItemCreateArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TradeItems.
     * @param {TradeItemCreateManyArgs} args - Arguments to create many TradeItems.
     * @example
     * // Create many TradeItems
     * const tradeItem = await prisma.tradeItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeItemCreateManyArgs>(args?: SelectSubset<T, TradeItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeItems and returns the data saved in the database.
     * @param {TradeItemCreateManyAndReturnArgs} args - Arguments to create many TradeItems.
     * @example
     * // Create many TradeItems
     * const tradeItem = await prisma.tradeItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeItems and only return the `id`
     * const tradeItemWithIdOnly = await prisma.tradeItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeItemCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TradeItem.
     * @param {TradeItemDeleteArgs} args - Arguments to delete one TradeItem.
     * @example
     * // Delete one TradeItem
     * const TradeItem = await prisma.tradeItem.delete({
     *   where: {
     *     // ... filter to delete one TradeItem
     *   }
     * })
     * 
     */
    delete<T extends TradeItemDeleteArgs>(args: SelectSubset<T, TradeItemDeleteArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TradeItem.
     * @param {TradeItemUpdateArgs} args - Arguments to update one TradeItem.
     * @example
     * // Update one TradeItem
     * const tradeItem = await prisma.tradeItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeItemUpdateArgs>(args: SelectSubset<T, TradeItemUpdateArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TradeItems.
     * @param {TradeItemDeleteManyArgs} args - Arguments to filter TradeItems to delete.
     * @example
     * // Delete a few TradeItems
     * const { count } = await prisma.tradeItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeItemDeleteManyArgs>(args?: SelectSubset<T, TradeItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeItems
     * const tradeItem = await prisma.tradeItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeItemUpdateManyArgs>(args: SelectSubset<T, TradeItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TradeItem.
     * @param {TradeItemUpsertArgs} args - Arguments to update or create a TradeItem.
     * @example
     * // Update or create a TradeItem
     * const tradeItem = await prisma.tradeItem.upsert({
     *   create: {
     *     // ... data to create a TradeItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeItem we want to update
     *   }
     * })
     */
    upsert<T extends TradeItemUpsertArgs>(args: SelectSubset<T, TradeItemUpsertArgs<ExtArgs>>): Prisma__TradeItemClient<$Result.GetResult<Prisma.$TradeItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TradeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemCountArgs} args - Arguments to filter TradeItems to count.
     * @example
     * // Count the number of TradeItems
     * const count = await prisma.tradeItem.count({
     *   where: {
     *     // ... the filter for the TradeItems we want to count
     *   }
     * })
    **/
    count<T extends TradeItemCountArgs>(
      args?: Subset<T, TradeItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeItemAggregateArgs>(args: Subset<T, TradeItemAggregateArgs>): Prisma.PrismaPromise<GetTradeItemAggregateType<T>>

    /**
     * Group by TradeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeItemGroupByArgs['orderBy'] }
        : { orderBy?: TradeItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeItem model
   */
  readonly fields: TradeItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    trade<T extends TradeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TradeDefaultArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradeItem model
   */ 
  interface TradeItemFieldRefs {
    readonly id: FieldRef<"TradeItem", 'String'>
    readonly tradeId: FieldRef<"TradeItem", 'String'>
    readonly itemId: FieldRef<"TradeItem", 'String'>
    readonly side: FieldRef<"TradeItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TradeItem findUnique
   */
  export type TradeItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * Filter, which TradeItem to fetch.
     */
    where: TradeItemWhereUniqueInput
  }

  /**
   * TradeItem findUniqueOrThrow
   */
  export type TradeItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * Filter, which TradeItem to fetch.
     */
    where: TradeItemWhereUniqueInput
  }

  /**
   * TradeItem findFirst
   */
  export type TradeItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * Filter, which TradeItem to fetch.
     */
    where?: TradeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeItems to fetch.
     */
    orderBy?: TradeItemOrderByWithRelationInput | TradeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeItems.
     */
    cursor?: TradeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeItems.
     */
    distinct?: TradeItemScalarFieldEnum | TradeItemScalarFieldEnum[]
  }

  /**
   * TradeItem findFirstOrThrow
   */
  export type TradeItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * Filter, which TradeItem to fetch.
     */
    where?: TradeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeItems to fetch.
     */
    orderBy?: TradeItemOrderByWithRelationInput | TradeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeItems.
     */
    cursor?: TradeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeItems.
     */
    distinct?: TradeItemScalarFieldEnum | TradeItemScalarFieldEnum[]
  }

  /**
   * TradeItem findMany
   */
  export type TradeItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * Filter, which TradeItems to fetch.
     */
    where?: TradeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeItems to fetch.
     */
    orderBy?: TradeItemOrderByWithRelationInput | TradeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeItems.
     */
    cursor?: TradeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeItems.
     */
    skip?: number
    distinct?: TradeItemScalarFieldEnum | TradeItemScalarFieldEnum[]
  }

  /**
   * TradeItem create
   */
  export type TradeItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * The data needed to create a TradeItem.
     */
    data: XOR<TradeItemCreateInput, TradeItemUncheckedCreateInput>
  }

  /**
   * TradeItem createMany
   */
  export type TradeItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeItems.
     */
    data: TradeItemCreateManyInput | TradeItemCreateManyInput[]
  }

  /**
   * TradeItem createManyAndReturn
   */
  export type TradeItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TradeItems.
     */
    data: TradeItemCreateManyInput | TradeItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeItem update
   */
  export type TradeItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * The data needed to update a TradeItem.
     */
    data: XOR<TradeItemUpdateInput, TradeItemUncheckedUpdateInput>
    /**
     * Choose, which TradeItem to update.
     */
    where: TradeItemWhereUniqueInput
  }

  /**
   * TradeItem updateMany
   */
  export type TradeItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeItems.
     */
    data: XOR<TradeItemUpdateManyMutationInput, TradeItemUncheckedUpdateManyInput>
    /**
     * Filter which TradeItems to update
     */
    where?: TradeItemWhereInput
  }

  /**
   * TradeItem upsert
   */
  export type TradeItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * The filter to search for the TradeItem to update in case it exists.
     */
    where: TradeItemWhereUniqueInput
    /**
     * In case the TradeItem found by the `where` argument doesn't exist, create a new TradeItem with this data.
     */
    create: XOR<TradeItemCreateInput, TradeItemUncheckedCreateInput>
    /**
     * In case the TradeItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeItemUpdateInput, TradeItemUncheckedUpdateInput>
  }

  /**
   * TradeItem delete
   */
  export type TradeItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
    /**
     * Filter which TradeItem to delete.
     */
    where: TradeItemWhereUniqueInput
  }

  /**
   * TradeItem deleteMany
   */
  export type TradeItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeItems to delete
     */
    where?: TradeItemWhereInput
  }

  /**
   * TradeItem without action
   */
  export type TradeItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeItem
     */
    select?: TradeItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeItemInclude<ExtArgs> | null
  }


  /**
   * Model Favorite
   */

  export type AggregateFavorite = {
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  export type FavoriteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    itemId: string | null
    createdAt: Date | null
  }

  export type FavoriteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    itemId: string | null
    createdAt: Date | null
  }

  export type FavoriteCountAggregateOutputType = {
    id: number
    userId: number
    itemId: number
    createdAt: number
    _all: number
  }


  export type FavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    itemId?: true
    createdAt?: true
  }

  export type FavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    itemId?: true
    createdAt?: true
  }

  export type FavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    itemId?: true
    createdAt?: true
    _all?: true
  }

  export type FavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorite to aggregate.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Favorites
    **/
    _count?: true | FavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavoriteMaxAggregateInputType
  }

  export type GetFavoriteAggregateType<T extends FavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavorite[P]>
      : GetScalarType<T[P], AggregateFavorite[P]>
  }




  export type FavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FavoriteWhereInput
    orderBy?: FavoriteOrderByWithAggregationInput | FavoriteOrderByWithAggregationInput[]
    by: FavoriteScalarFieldEnum[] | FavoriteScalarFieldEnum
    having?: FavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavoriteCountAggregateInputType | true
    _min?: FavoriteMinAggregateInputType
    _max?: FavoriteMaxAggregateInputType
  }

  export type FavoriteGroupByOutputType = {
    id: string
    userId: string
    itemId: string
    createdAt: Date
    _count: FavoriteCountAggregateOutputType | null
    _min: FavoriteMinAggregateOutputType | null
    _max: FavoriteMaxAggregateOutputType | null
  }

  type GetFavoriteGroupByPayload<T extends FavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], FavoriteGroupByOutputType[P]>
        }
      >
    >


  export type FavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["favorite"]>

  export type FavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    itemId?: boolean
    createdAt?: boolean
  }

  export type FavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type FavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $FavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Favorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      itemId: string
      createdAt: Date
    }, ExtArgs["result"]["favorite"]>
    composites: {}
  }

  type FavoriteGetPayload<S extends boolean | null | undefined | FavoriteDefaultArgs> = $Result.GetResult<Prisma.$FavoritePayload, S>

  type FavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FavoriteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FavoriteCountAggregateInputType | true
    }

  export interface FavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Favorite'], meta: { name: 'Favorite' } }
    /**
     * Find zero or one Favorite that matches the filter.
     * @param {FavoriteFindUniqueArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FavoriteFindUniqueArgs>(args: SelectSubset<T, FavoriteFindUniqueArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Favorite that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FavoriteFindUniqueOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, FavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FavoriteFindFirstArgs>(args?: SelectSubset<T, FavoriteFindFirstArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindFirstOrThrowArgs} args - Arguments to find a Favorite
     * @example
     * // Get one Favorite
     * const favorite = await prisma.favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, FavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favorites
     * const favorites = await prisma.favorite.findMany()
     * 
     * // Get first 10 Favorites
     * const favorites = await prisma.favorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favoriteWithIdOnly = await prisma.favorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FavoriteFindManyArgs>(args?: SelectSubset<T, FavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Favorite.
     * @param {FavoriteCreateArgs} args - Arguments to create a Favorite.
     * @example
     * // Create one Favorite
     * const Favorite = await prisma.favorite.create({
     *   data: {
     *     // ... data to create a Favorite
     *   }
     * })
     * 
     */
    create<T extends FavoriteCreateArgs>(args: SelectSubset<T, FavoriteCreateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Favorites.
     * @param {FavoriteCreateManyArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FavoriteCreateManyArgs>(args?: SelectSubset<T, FavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Favorites and returns the data saved in the database.
     * @param {FavoriteCreateManyAndReturnArgs} args - Arguments to create many Favorites.
     * @example
     * // Create many Favorites
     * const favorite = await prisma.favorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Favorites and only return the `id`
     * const favoriteWithIdOnly = await prisma.favorite.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, FavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Favorite.
     * @param {FavoriteDeleteArgs} args - Arguments to delete one Favorite.
     * @example
     * // Delete one Favorite
     * const Favorite = await prisma.favorite.delete({
     *   where: {
     *     // ... filter to delete one Favorite
     *   }
     * })
     * 
     */
    delete<T extends FavoriteDeleteArgs>(args: SelectSubset<T, FavoriteDeleteArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Favorite.
     * @param {FavoriteUpdateArgs} args - Arguments to update one Favorite.
     * @example
     * // Update one Favorite
     * const favorite = await prisma.favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FavoriteUpdateArgs>(args: SelectSubset<T, FavoriteUpdateArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Favorites.
     * @param {FavoriteDeleteManyArgs} args - Arguments to filter Favorites to delete.
     * @example
     * // Delete a few Favorites
     * const { count } = await prisma.favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FavoriteDeleteManyArgs>(args?: SelectSubset<T, FavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favorites
     * const favorite = await prisma.favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FavoriteUpdateManyArgs>(args: SelectSubset<T, FavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Favorite.
     * @param {FavoriteUpsertArgs} args - Arguments to update or create a Favorite.
     * @example
     * // Update or create a Favorite
     * const favorite = await prisma.favorite.upsert({
     *   create: {
     *     // ... data to create a Favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favorite we want to update
     *   }
     * })
     */
    upsert<T extends FavoriteUpsertArgs>(args: SelectSubset<T, FavoriteUpsertArgs<ExtArgs>>): Prisma__FavoriteClient<$Result.GetResult<Prisma.$FavoritePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteCountArgs} args - Arguments to filter Favorites to count.
     * @example
     * // Count the number of Favorites
     * const count = await prisma.favorite.count({
     *   where: {
     *     // ... the filter for the Favorites we want to count
     *   }
     * })
    **/
    count<T extends FavoriteCountArgs>(
      args?: Subset<T, FavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavoriteAggregateArgs>(args: Subset<T, FavoriteAggregateArgs>): Prisma.PrismaPromise<GetFavoriteAggregateType<T>>

    /**
     * Group by Favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavoriteGroupByArgs['orderBy'] }
        : { orderBy?: FavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Favorite model
   */
  readonly fields: FavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Favorite model
   */ 
  interface FavoriteFieldRefs {
    readonly id: FieldRef<"Favorite", 'String'>
    readonly userId: FieldRef<"Favorite", 'String'>
    readonly itemId: FieldRef<"Favorite", 'String'>
    readonly createdAt: FieldRef<"Favorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Favorite findUnique
   */
  export type FavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findUniqueOrThrow
   */
  export type FavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite findFirst
   */
  export type FavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findFirstOrThrow
   */
  export type FavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorite to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Favorites.
     */
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite findMany
   */
  export type FavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter, which Favorites to fetch.
     */
    where?: FavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Favorites to fetch.
     */
    orderBy?: FavoriteOrderByWithRelationInput | FavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Favorites.
     */
    cursor?: FavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Favorites.
     */
    skip?: number
    distinct?: FavoriteScalarFieldEnum | FavoriteScalarFieldEnum[]
  }

  /**
   * Favorite create
   */
  export type FavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a Favorite.
     */
    data: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
  }

  /**
   * Favorite createMany
   */
  export type FavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
  }

  /**
   * Favorite createManyAndReturn
   */
  export type FavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Favorites.
     */
    data: FavoriteCreateManyInput | FavoriteCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Favorite update
   */
  export type FavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a Favorite.
     */
    data: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
    /**
     * Choose, which Favorite to update.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite updateMany
   */
  export type FavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Favorites.
     */
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyInput>
    /**
     * Filter which Favorites to update
     */
    where?: FavoriteWhereInput
  }

  /**
   * Favorite upsert
   */
  export type FavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the Favorite to update in case it exists.
     */
    where: FavoriteWhereUniqueInput
    /**
     * In case the Favorite found by the `where` argument doesn't exist, create a new Favorite with this data.
     */
    create: XOR<FavoriteCreateInput, FavoriteUncheckedCreateInput>
    /**
     * In case the Favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FavoriteUpdateInput, FavoriteUncheckedUpdateInput>
  }

  /**
   * Favorite delete
   */
  export type FavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
    /**
     * Filter which Favorite to delete.
     */
    where: FavoriteWhereUniqueInput
  }

  /**
   * Favorite deleteMany
   */
  export type FavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Favorites to delete
     */
    where?: FavoriteWhereInput
  }

  /**
   * Favorite without action
   */
  export type FavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Favorite
     */
    select?: FavoriteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FavoriteInclude<ExtArgs> | null
  }


  /**
   * Model MessageRoom
   */

  export type AggregateMessageRoom = {
    _count: MessageRoomCountAggregateOutputType | null
    _min: MessageRoomMinAggregateOutputType | null
    _max: MessageRoomMaxAggregateOutputType | null
  }

  export type MessageRoomMinAggregateOutputType = {
    id: string | null
    user1Id: string | null
    user2Id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageRoomMaxAggregateOutputType = {
    id: string | null
    user1Id: string | null
    user2Id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageRoomCountAggregateOutputType = {
    id: number
    user1Id: number
    user2Id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageRoomMinAggregateInputType = {
    id?: true
    user1Id?: true
    user2Id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageRoomMaxAggregateInputType = {
    id?: true
    user1Id?: true
    user2Id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageRoomCountAggregateInputType = {
    id?: true
    user1Id?: true
    user2Id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageRoom to aggregate.
     */
    where?: MessageRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRooms to fetch.
     */
    orderBy?: MessageRoomOrderByWithRelationInput | MessageRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MessageRooms
    **/
    _count?: true | MessageRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageRoomMaxAggregateInputType
  }

  export type GetMessageRoomAggregateType<T extends MessageRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateMessageRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessageRoom[P]>
      : GetScalarType<T[P], AggregateMessageRoom[P]>
  }




  export type MessageRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageRoomWhereInput
    orderBy?: MessageRoomOrderByWithAggregationInput | MessageRoomOrderByWithAggregationInput[]
    by: MessageRoomScalarFieldEnum[] | MessageRoomScalarFieldEnum
    having?: MessageRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageRoomCountAggregateInputType | true
    _min?: MessageRoomMinAggregateInputType
    _max?: MessageRoomMaxAggregateInputType
  }

  export type MessageRoomGroupByOutputType = {
    id: string
    user1Id: string
    user2Id: string
    createdAt: Date
    updatedAt: Date
    _count: MessageRoomCountAggregateOutputType | null
    _min: MessageRoomMinAggregateOutputType | null
    _max: MessageRoomMaxAggregateOutputType | null
  }

  type GetMessageRoomGroupByPayload<T extends MessageRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageRoomGroupByOutputType[P]>
            : GetScalarType<T[P], MessageRoomGroupByOutputType[P]>
        }
      >
    >


  export type MessageRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | MessageRoom$messagesArgs<ExtArgs>
    _count?: boolean | MessageRoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageRoom"]>

  export type MessageRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messageRoom"]>

  export type MessageRoomSelectScalar = {
    id?: boolean
    user1Id?: boolean
    user2Id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageRoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | MessageRoom$messagesArgs<ExtArgs>
    _count?: boolean | MessageRoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MessageRoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1?: boolean | UserDefaultArgs<ExtArgs>
    user2?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessageRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MessageRoom"
    objects: {
      user1: Prisma.$UserPayload<ExtArgs>
      user2: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user1Id: string
      user2Id: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["messageRoom"]>
    composites: {}
  }

  type MessageRoomGetPayload<S extends boolean | null | undefined | MessageRoomDefaultArgs> = $Result.GetResult<Prisma.$MessageRoomPayload, S>

  type MessageRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageRoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageRoomCountAggregateInputType | true
    }

  export interface MessageRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MessageRoom'], meta: { name: 'MessageRoom' } }
    /**
     * Find zero or one MessageRoom that matches the filter.
     * @param {MessageRoomFindUniqueArgs} args - Arguments to find a MessageRoom
     * @example
     * // Get one MessageRoom
     * const messageRoom = await prisma.messageRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageRoomFindUniqueArgs>(args: SelectSubset<T, MessageRoomFindUniqueArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MessageRoom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageRoomFindUniqueOrThrowArgs} args - Arguments to find a MessageRoom
     * @example
     * // Get one MessageRoom
     * const messageRoom = await prisma.messageRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MessageRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomFindFirstArgs} args - Arguments to find a MessageRoom
     * @example
     * // Get one MessageRoom
     * const messageRoom = await prisma.messageRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageRoomFindFirstArgs>(args?: SelectSubset<T, MessageRoomFindFirstArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MessageRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomFindFirstOrThrowArgs} args - Arguments to find a MessageRoom
     * @example
     * // Get one MessageRoom
     * const messageRoom = await prisma.messageRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MessageRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MessageRooms
     * const messageRooms = await prisma.messageRoom.findMany()
     * 
     * // Get first 10 MessageRooms
     * const messageRooms = await prisma.messageRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageRoomWithIdOnly = await prisma.messageRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageRoomFindManyArgs>(args?: SelectSubset<T, MessageRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MessageRoom.
     * @param {MessageRoomCreateArgs} args - Arguments to create a MessageRoom.
     * @example
     * // Create one MessageRoom
     * const MessageRoom = await prisma.messageRoom.create({
     *   data: {
     *     // ... data to create a MessageRoom
     *   }
     * })
     * 
     */
    create<T extends MessageRoomCreateArgs>(args: SelectSubset<T, MessageRoomCreateArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MessageRooms.
     * @param {MessageRoomCreateManyArgs} args - Arguments to create many MessageRooms.
     * @example
     * // Create many MessageRooms
     * const messageRoom = await prisma.messageRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageRoomCreateManyArgs>(args?: SelectSubset<T, MessageRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MessageRooms and returns the data saved in the database.
     * @param {MessageRoomCreateManyAndReturnArgs} args - Arguments to create many MessageRooms.
     * @example
     * // Create many MessageRooms
     * const messageRoom = await prisma.messageRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MessageRooms and only return the `id`
     * const messageRoomWithIdOnly = await prisma.messageRoom.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MessageRoom.
     * @param {MessageRoomDeleteArgs} args - Arguments to delete one MessageRoom.
     * @example
     * // Delete one MessageRoom
     * const MessageRoom = await prisma.messageRoom.delete({
     *   where: {
     *     // ... filter to delete one MessageRoom
     *   }
     * })
     * 
     */
    delete<T extends MessageRoomDeleteArgs>(args: SelectSubset<T, MessageRoomDeleteArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MessageRoom.
     * @param {MessageRoomUpdateArgs} args - Arguments to update one MessageRoom.
     * @example
     * // Update one MessageRoom
     * const messageRoom = await prisma.messageRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageRoomUpdateArgs>(args: SelectSubset<T, MessageRoomUpdateArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MessageRooms.
     * @param {MessageRoomDeleteManyArgs} args - Arguments to filter MessageRooms to delete.
     * @example
     * // Delete a few MessageRooms
     * const { count } = await prisma.messageRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageRoomDeleteManyArgs>(args?: SelectSubset<T, MessageRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MessageRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MessageRooms
     * const messageRoom = await prisma.messageRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageRoomUpdateManyArgs>(args: SelectSubset<T, MessageRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MessageRoom.
     * @param {MessageRoomUpsertArgs} args - Arguments to update or create a MessageRoom.
     * @example
     * // Update or create a MessageRoom
     * const messageRoom = await prisma.messageRoom.upsert({
     *   create: {
     *     // ... data to create a MessageRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MessageRoom we want to update
     *   }
     * })
     */
    upsert<T extends MessageRoomUpsertArgs>(args: SelectSubset<T, MessageRoomUpsertArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MessageRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomCountArgs} args - Arguments to filter MessageRooms to count.
     * @example
     * // Count the number of MessageRooms
     * const count = await prisma.messageRoom.count({
     *   where: {
     *     // ... the filter for the MessageRooms we want to count
     *   }
     * })
    **/
    count<T extends MessageRoomCountArgs>(
      args?: Subset<T, MessageRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MessageRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageRoomAggregateArgs>(args: Subset<T, MessageRoomAggregateArgs>): Prisma.PrismaPromise<GetMessageRoomAggregateType<T>>

    /**
     * Group by MessageRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageRoomGroupByArgs['orderBy'] }
        : { orderBy?: MessageRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MessageRoom model
   */
  readonly fields: MessageRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MessageRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user1<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user2<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    messages<T extends MessageRoom$messagesArgs<ExtArgs> = {}>(args?: Subset<T, MessageRoom$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MessageRoom model
   */ 
  interface MessageRoomFieldRefs {
    readonly id: FieldRef<"MessageRoom", 'String'>
    readonly user1Id: FieldRef<"MessageRoom", 'String'>
    readonly user2Id: FieldRef<"MessageRoom", 'String'>
    readonly createdAt: FieldRef<"MessageRoom", 'DateTime'>
    readonly updatedAt: FieldRef<"MessageRoom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MessageRoom findUnique
   */
  export type MessageRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * Filter, which MessageRoom to fetch.
     */
    where: MessageRoomWhereUniqueInput
  }

  /**
   * MessageRoom findUniqueOrThrow
   */
  export type MessageRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * Filter, which MessageRoom to fetch.
     */
    where: MessageRoomWhereUniqueInput
  }

  /**
   * MessageRoom findFirst
   */
  export type MessageRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * Filter, which MessageRoom to fetch.
     */
    where?: MessageRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRooms to fetch.
     */
    orderBy?: MessageRoomOrderByWithRelationInput | MessageRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageRooms.
     */
    cursor?: MessageRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageRooms.
     */
    distinct?: MessageRoomScalarFieldEnum | MessageRoomScalarFieldEnum[]
  }

  /**
   * MessageRoom findFirstOrThrow
   */
  export type MessageRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * Filter, which MessageRoom to fetch.
     */
    where?: MessageRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRooms to fetch.
     */
    orderBy?: MessageRoomOrderByWithRelationInput | MessageRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MessageRooms.
     */
    cursor?: MessageRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MessageRooms.
     */
    distinct?: MessageRoomScalarFieldEnum | MessageRoomScalarFieldEnum[]
  }

  /**
   * MessageRoom findMany
   */
  export type MessageRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * Filter, which MessageRooms to fetch.
     */
    where?: MessageRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MessageRooms to fetch.
     */
    orderBy?: MessageRoomOrderByWithRelationInput | MessageRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MessageRooms.
     */
    cursor?: MessageRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MessageRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MessageRooms.
     */
    skip?: number
    distinct?: MessageRoomScalarFieldEnum | MessageRoomScalarFieldEnum[]
  }

  /**
   * MessageRoom create
   */
  export type MessageRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * The data needed to create a MessageRoom.
     */
    data: XOR<MessageRoomCreateInput, MessageRoomUncheckedCreateInput>
  }

  /**
   * MessageRoom createMany
   */
  export type MessageRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MessageRooms.
     */
    data: MessageRoomCreateManyInput | MessageRoomCreateManyInput[]
  }

  /**
   * MessageRoom createManyAndReturn
   */
  export type MessageRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MessageRooms.
     */
    data: MessageRoomCreateManyInput | MessageRoomCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MessageRoom update
   */
  export type MessageRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * The data needed to update a MessageRoom.
     */
    data: XOR<MessageRoomUpdateInput, MessageRoomUncheckedUpdateInput>
    /**
     * Choose, which MessageRoom to update.
     */
    where: MessageRoomWhereUniqueInput
  }

  /**
   * MessageRoom updateMany
   */
  export type MessageRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MessageRooms.
     */
    data: XOR<MessageRoomUpdateManyMutationInput, MessageRoomUncheckedUpdateManyInput>
    /**
     * Filter which MessageRooms to update
     */
    where?: MessageRoomWhereInput
  }

  /**
   * MessageRoom upsert
   */
  export type MessageRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * The filter to search for the MessageRoom to update in case it exists.
     */
    where: MessageRoomWhereUniqueInput
    /**
     * In case the MessageRoom found by the `where` argument doesn't exist, create a new MessageRoom with this data.
     */
    create: XOR<MessageRoomCreateInput, MessageRoomUncheckedCreateInput>
    /**
     * In case the MessageRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageRoomUpdateInput, MessageRoomUncheckedUpdateInput>
  }

  /**
   * MessageRoom delete
   */
  export type MessageRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
    /**
     * Filter which MessageRoom to delete.
     */
    where: MessageRoomWhereUniqueInput
  }

  /**
   * MessageRoom deleteMany
   */
  export type MessageRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MessageRooms to delete
     */
    where?: MessageRoomWhereInput
  }

  /**
   * MessageRoom.messages
   */
  export type MessageRoom$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * MessageRoom without action
   */
  export type MessageRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MessageRoom
     */
    select?: MessageRoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageRoomInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    content: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    senderId: string | null
    content: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    roomId: number
    senderId: number
    content: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    content?: true
    isRead?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    content?: true
    isRead?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    roomId?: true
    senderId?: true
    content?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    roomId: string
    senderId: string
    content: string
    isRead: boolean
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    isRead?: boolean
    createdAt?: boolean
    room?: boolean | MessageRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    isRead?: boolean
    createdAt?: boolean
    room?: boolean | MessageRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    roomId?: boolean
    senderId?: boolean
    content?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | MessageRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | MessageRoomDefaultArgs<ExtArgs>
    sender?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      room: Prisma.$MessageRoomPayload<ExtArgs>
      sender: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      senderId: string
      content: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends MessageRoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MessageRoomDefaultArgs<ExtArgs>>): Prisma__MessageRoomClient<$Result.GetResult<Prisma.$MessageRoomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly roomId: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly isRead: FieldRef<"Message", 'Boolean'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    body: string | null
    isRead: boolean | null
    data: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    body: string | null
    isRead: boolean | null
    data: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    body: number
    isRead: number
    data: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    isRead?: true
    data?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    isRead?: true
    data?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    body?: true
    isRead?: true
    data?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: string
    title: string
    body: string | null
    isRead: boolean
    data: string | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    isRead?: boolean
    data?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    isRead?: boolean
    data?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    body?: boolean
    isRead?: boolean
    data?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      title: string
      body: string | null
      isRead: boolean
      data: string | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly data: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Address
   */

  export type AggregateAddress = {
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  export type AddressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    address: string | null
    city: string | null
    type: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    address: string | null
    city: string | null
    type: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AddressCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    address: number
    city: number
    type: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AddressMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    address?: true
    city?: true
    type?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    address?: true
    city?: true
    type?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AddressCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    address?: true
    city?: true
    type?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AddressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Address to aggregate.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Addresses
    **/
    _count?: true | AddressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AddressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AddressMaxAggregateInputType
  }

  export type GetAddressAggregateType<T extends AddressAggregateArgs> = {
        [P in keyof T & keyof AggregateAddress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAddress[P]>
      : GetScalarType<T[P], AggregateAddress[P]>
  }




  export type AddressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AddressWhereInput
    orderBy?: AddressOrderByWithAggregationInput | AddressOrderByWithAggregationInput[]
    by: AddressScalarFieldEnum[] | AddressScalarFieldEnum
    having?: AddressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AddressCountAggregateInputType | true
    _min?: AddressMinAggregateInputType
    _max?: AddressMaxAggregateInputType
  }

  export type AddressGroupByOutputType = {
    id: string
    userId: string
    title: string
    address: string
    city: string
    type: string
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: AddressCountAggregateOutputType | null
    _min: AddressMinAggregateOutputType | null
    _max: AddressMaxAggregateOutputType | null
  }

  type GetAddressGroupByPayload<T extends AddressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AddressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AddressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AddressGroupByOutputType[P]>
            : GetScalarType<T[P], AddressGroupByOutputType[P]>
        }
      >
    >


  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    address?: boolean
    city?: boolean
    type?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    address?: boolean
    city?: boolean
    type?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["address"]>

  export type AddressSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    address?: boolean
    city?: boolean
    type?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AddressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AddressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AddressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Address"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      address: string
      city: string
      type: string
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["address"]>
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>

  type AddressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AddressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AddressCountAggregateInputType | true
    }

  export interface AddressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Address'], meta: { name: 'Address' } }
    /**
     * Find zero or one Address that matches the filter.
     * @param {AddressFindUniqueArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AddressFindUniqueArgs>(args: SelectSubset<T, AddressFindUniqueArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Address that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AddressFindUniqueOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AddressFindUniqueOrThrowArgs>(args: SelectSubset<T, AddressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Address that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AddressFindFirstArgs>(args?: SelectSubset<T, AddressFindFirstArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Address that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindFirstOrThrowArgs} args - Arguments to find a Address
     * @example
     * // Get one Address
     * const address = await prisma.address.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AddressFindFirstOrThrowArgs>(args?: SelectSubset<T, AddressFindFirstOrThrowArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Addresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Addresses
     * const addresses = await prisma.address.findMany()
     * 
     * // Get first 10 Addresses
     * const addresses = await prisma.address.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const addressWithIdOnly = await prisma.address.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AddressFindManyArgs>(args?: SelectSubset<T, AddressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Address.
     * @param {AddressCreateArgs} args - Arguments to create a Address.
     * @example
     * // Create one Address
     * const Address = await prisma.address.create({
     *   data: {
     *     // ... data to create a Address
     *   }
     * })
     * 
     */
    create<T extends AddressCreateArgs>(args: SelectSubset<T, AddressCreateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Addresses.
     * @param {AddressCreateManyArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AddressCreateManyArgs>(args?: SelectSubset<T, AddressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Addresses and returns the data saved in the database.
     * @param {AddressCreateManyAndReturnArgs} args - Arguments to create many Addresses.
     * @example
     * // Create many Addresses
     * const address = await prisma.address.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Addresses and only return the `id`
     * const addressWithIdOnly = await prisma.address.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AddressCreateManyAndReturnArgs>(args?: SelectSubset<T, AddressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Address.
     * @param {AddressDeleteArgs} args - Arguments to delete one Address.
     * @example
     * // Delete one Address
     * const Address = await prisma.address.delete({
     *   where: {
     *     // ... filter to delete one Address
     *   }
     * })
     * 
     */
    delete<T extends AddressDeleteArgs>(args: SelectSubset<T, AddressDeleteArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Address.
     * @param {AddressUpdateArgs} args - Arguments to update one Address.
     * @example
     * // Update one Address
     * const address = await prisma.address.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AddressUpdateArgs>(args: SelectSubset<T, AddressUpdateArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Addresses.
     * @param {AddressDeleteManyArgs} args - Arguments to filter Addresses to delete.
     * @example
     * // Delete a few Addresses
     * const { count } = await prisma.address.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AddressDeleteManyArgs>(args?: SelectSubset<T, AddressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Addresses
     * const address = await prisma.address.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AddressUpdateManyArgs>(args: SelectSubset<T, AddressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Address.
     * @param {AddressUpsertArgs} args - Arguments to update or create a Address.
     * @example
     * // Update or create a Address
     * const address = await prisma.address.upsert({
     *   create: {
     *     // ... data to create a Address
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Address we want to update
     *   }
     * })
     */
    upsert<T extends AddressUpsertArgs>(args: SelectSubset<T, AddressUpsertArgs<ExtArgs>>): Prisma__AddressClient<$Result.GetResult<Prisma.$AddressPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Addresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressCountArgs} args - Arguments to filter Addresses to count.
     * @example
     * // Count the number of Addresses
     * const count = await prisma.address.count({
     *   where: {
     *     // ... the filter for the Addresses we want to count
     *   }
     * })
    **/
    count<T extends AddressCountArgs>(
      args?: Subset<T, AddressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AddressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AddressAggregateArgs>(args: Subset<T, AddressAggregateArgs>): Prisma.PrismaPromise<GetAddressAggregateType<T>>

    /**
     * Group by Address.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AddressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AddressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AddressGroupByArgs['orderBy'] }
        : { orderBy?: AddressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AddressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAddressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Address model
   */
  readonly fields: AddressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Address.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AddressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Address model
   */ 
  interface AddressFieldRefs {
    readonly id: FieldRef<"Address", 'String'>
    readonly userId: FieldRef<"Address", 'String'>
    readonly title: FieldRef<"Address", 'String'>
    readonly address: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
    readonly type: FieldRef<"Address", 'String'>
    readonly isDefault: FieldRef<"Address", 'Boolean'>
    readonly createdAt: FieldRef<"Address", 'DateTime'>
    readonly updatedAt: FieldRef<"Address", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Address findUnique
   */
  export type AddressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findUniqueOrThrow
   */
  export type AddressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address findFirst
   */
  export type AddressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findFirstOrThrow
   */
  export type AddressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Address to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Addresses.
     */
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address findMany
   */
  export type AddressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter, which Addresses to fetch.
     */
    where?: AddressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Addresses to fetch.
     */
    orderBy?: AddressOrderByWithRelationInput | AddressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Addresses.
     */
    cursor?: AddressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Addresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Addresses.
     */
    skip?: number
    distinct?: AddressScalarFieldEnum | AddressScalarFieldEnum[]
  }

  /**
   * Address create
   */
  export type AddressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to create a Address.
     */
    data: XOR<AddressCreateInput, AddressUncheckedCreateInput>
  }

  /**
   * Address createMany
   */
  export type AddressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
  }

  /**
   * Address createManyAndReturn
   */
  export type AddressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Addresses.
     */
    data: AddressCreateManyInput | AddressCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Address update
   */
  export type AddressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The data needed to update a Address.
     */
    data: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
    /**
     * Choose, which Address to update.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address updateMany
   */
  export type AddressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Addresses.
     */
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyInput>
    /**
     * Filter which Addresses to update
     */
    where?: AddressWhereInput
  }

  /**
   * Address upsert
   */
  export type AddressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * The filter to search for the Address to update in case it exists.
     */
    where: AddressWhereUniqueInput
    /**
     * In case the Address found by the `where` argument doesn't exist, create a new Address with this data.
     */
    create: XOR<AddressCreateInput, AddressUncheckedCreateInput>
    /**
     * In case the Address was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AddressUpdateInput, AddressUncheckedUpdateInput>
  }

  /**
   * Address delete
   */
  export type AddressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
    /**
     * Filter which Address to delete.
     */
    where: AddressWhereUniqueInput
  }

  /**
   * Address deleteMany
   */
  export type AddressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Addresses to delete
     */
    where?: AddressWhereInput
  }

  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AddressInclude<ExtArgs> | null
  }


  /**
   * Model Interaction
   */

  export type AggregateInteraction = {
    _count: InteractionCountAggregateOutputType | null
    _min: InteractionMinAggregateOutputType | null
    _max: InteractionMaxAggregateOutputType | null
  }

  export type InteractionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    itemId: string | null
    type: string | null
    createdAt: Date | null
  }

  export type InteractionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    itemId: string | null
    type: string | null
    createdAt: Date | null
  }

  export type InteractionCountAggregateOutputType = {
    id: number
    userId: number
    itemId: number
    type: number
    createdAt: number
    _all: number
  }


  export type InteractionMinAggregateInputType = {
    id?: true
    userId?: true
    itemId?: true
    type?: true
    createdAt?: true
  }

  export type InteractionMaxAggregateInputType = {
    id?: true
    userId?: true
    itemId?: true
    type?: true
    createdAt?: true
  }

  export type InteractionCountAggregateInputType = {
    id?: true
    userId?: true
    itemId?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type InteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interaction to aggregate.
     */
    where?: InteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Interactions
    **/
    _count?: true | InteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InteractionMaxAggregateInputType
  }

  export type GetInteractionAggregateType<T extends InteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInteraction[P]>
      : GetScalarType<T[P], AggregateInteraction[P]>
  }




  export type InteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InteractionWhereInput
    orderBy?: InteractionOrderByWithAggregationInput | InteractionOrderByWithAggregationInput[]
    by: InteractionScalarFieldEnum[] | InteractionScalarFieldEnum
    having?: InteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InteractionCountAggregateInputType | true
    _min?: InteractionMinAggregateInputType
    _max?: InteractionMaxAggregateInputType
  }

  export type InteractionGroupByOutputType = {
    id: string
    userId: string
    itemId: string
    type: string
    createdAt: Date
    _count: InteractionCountAggregateOutputType | null
    _min: InteractionMinAggregateOutputType | null
    _max: InteractionMaxAggregateOutputType | null
  }

  type GetInteractionGroupByPayload<T extends InteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InteractionGroupByOutputType[P]>
            : GetScalarType<T[P], InteractionGroupByOutputType[P]>
        }
      >
    >


  export type InteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interaction"]>

  export type InteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemId?: boolean
    type?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interaction"]>

  export type InteractionSelectScalar = {
    id?: boolean
    userId?: boolean
    itemId?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type InteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type InteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $InteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Interaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      itemId: string
      type: string
      createdAt: Date
    }, ExtArgs["result"]["interaction"]>
    composites: {}
  }

  type InteractionGetPayload<S extends boolean | null | undefined | InteractionDefaultArgs> = $Result.GetResult<Prisma.$InteractionPayload, S>

  type InteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InteractionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InteractionCountAggregateInputType | true
    }

  export interface InteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Interaction'], meta: { name: 'Interaction' } }
    /**
     * Find zero or one Interaction that matches the filter.
     * @param {InteractionFindUniqueArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InteractionFindUniqueArgs>(args: SelectSubset<T, InteractionFindUniqueArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Interaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InteractionFindUniqueOrThrowArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, InteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Interaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionFindFirstArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InteractionFindFirstArgs>(args?: SelectSubset<T, InteractionFindFirstArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Interaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionFindFirstOrThrowArgs} args - Arguments to find a Interaction
     * @example
     * // Get one Interaction
     * const interaction = await prisma.interaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, InteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Interactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Interactions
     * const interactions = await prisma.interaction.findMany()
     * 
     * // Get first 10 Interactions
     * const interactions = await prisma.interaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const interactionWithIdOnly = await prisma.interaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InteractionFindManyArgs>(args?: SelectSubset<T, InteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Interaction.
     * @param {InteractionCreateArgs} args - Arguments to create a Interaction.
     * @example
     * // Create one Interaction
     * const Interaction = await prisma.interaction.create({
     *   data: {
     *     // ... data to create a Interaction
     *   }
     * })
     * 
     */
    create<T extends InteractionCreateArgs>(args: SelectSubset<T, InteractionCreateArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Interactions.
     * @param {InteractionCreateManyArgs} args - Arguments to create many Interactions.
     * @example
     * // Create many Interactions
     * const interaction = await prisma.interaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InteractionCreateManyArgs>(args?: SelectSubset<T, InteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Interactions and returns the data saved in the database.
     * @param {InteractionCreateManyAndReturnArgs} args - Arguments to create many Interactions.
     * @example
     * // Create many Interactions
     * const interaction = await prisma.interaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Interactions and only return the `id`
     * const interactionWithIdOnly = await prisma.interaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, InteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Interaction.
     * @param {InteractionDeleteArgs} args - Arguments to delete one Interaction.
     * @example
     * // Delete one Interaction
     * const Interaction = await prisma.interaction.delete({
     *   where: {
     *     // ... filter to delete one Interaction
     *   }
     * })
     * 
     */
    delete<T extends InteractionDeleteArgs>(args: SelectSubset<T, InteractionDeleteArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Interaction.
     * @param {InteractionUpdateArgs} args - Arguments to update one Interaction.
     * @example
     * // Update one Interaction
     * const interaction = await prisma.interaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InteractionUpdateArgs>(args: SelectSubset<T, InteractionUpdateArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Interactions.
     * @param {InteractionDeleteManyArgs} args - Arguments to filter Interactions to delete.
     * @example
     * // Delete a few Interactions
     * const { count } = await prisma.interaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InteractionDeleteManyArgs>(args?: SelectSubset<T, InteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Interactions
     * const interaction = await prisma.interaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InteractionUpdateManyArgs>(args: SelectSubset<T, InteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Interaction.
     * @param {InteractionUpsertArgs} args - Arguments to update or create a Interaction.
     * @example
     * // Update or create a Interaction
     * const interaction = await prisma.interaction.upsert({
     *   create: {
     *     // ... data to create a Interaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Interaction we want to update
     *   }
     * })
     */
    upsert<T extends InteractionUpsertArgs>(args: SelectSubset<T, InteractionUpsertArgs<ExtArgs>>): Prisma__InteractionClient<$Result.GetResult<Prisma.$InteractionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Interactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionCountArgs} args - Arguments to filter Interactions to count.
     * @example
     * // Count the number of Interactions
     * const count = await prisma.interaction.count({
     *   where: {
     *     // ... the filter for the Interactions we want to count
     *   }
     * })
    **/
    count<T extends InteractionCountArgs>(
      args?: Subset<T, InteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Interaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InteractionAggregateArgs>(args: Subset<T, InteractionAggregateArgs>): Prisma.PrismaPromise<GetInteractionAggregateType<T>>

    /**
     * Group by Interaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InteractionGroupByArgs['orderBy'] }
        : { orderBy?: InteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Interaction model
   */
  readonly fields: InteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Interaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Interaction model
   */ 
  interface InteractionFieldRefs {
    readonly id: FieldRef<"Interaction", 'String'>
    readonly userId: FieldRef<"Interaction", 'String'>
    readonly itemId: FieldRef<"Interaction", 'String'>
    readonly type: FieldRef<"Interaction", 'String'>
    readonly createdAt: FieldRef<"Interaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Interaction findUnique
   */
  export type InteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * Filter, which Interaction to fetch.
     */
    where: InteractionWhereUniqueInput
  }

  /**
   * Interaction findUniqueOrThrow
   */
  export type InteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * Filter, which Interaction to fetch.
     */
    where: InteractionWhereUniqueInput
  }

  /**
   * Interaction findFirst
   */
  export type InteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * Filter, which Interaction to fetch.
     */
    where?: InteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interactions.
     */
    cursor?: InteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interactions.
     */
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[]
  }

  /**
   * Interaction findFirstOrThrow
   */
  export type InteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * Filter, which Interaction to fetch.
     */
    where?: InteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Interactions.
     */
    cursor?: InteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Interactions.
     */
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[]
  }

  /**
   * Interaction findMany
   */
  export type InteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * Filter, which Interactions to fetch.
     */
    where?: InteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Interactions to fetch.
     */
    orderBy?: InteractionOrderByWithRelationInput | InteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Interactions.
     */
    cursor?: InteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Interactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Interactions.
     */
    skip?: number
    distinct?: InteractionScalarFieldEnum | InteractionScalarFieldEnum[]
  }

  /**
   * Interaction create
   */
  export type InteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a Interaction.
     */
    data: XOR<InteractionCreateInput, InteractionUncheckedCreateInput>
  }

  /**
   * Interaction createMany
   */
  export type InteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Interactions.
     */
    data: InteractionCreateManyInput | InteractionCreateManyInput[]
  }

  /**
   * Interaction createManyAndReturn
   */
  export type InteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Interactions.
     */
    data: InteractionCreateManyInput | InteractionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Interaction update
   */
  export type InteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a Interaction.
     */
    data: XOR<InteractionUpdateInput, InteractionUncheckedUpdateInput>
    /**
     * Choose, which Interaction to update.
     */
    where: InteractionWhereUniqueInput
  }

  /**
   * Interaction updateMany
   */
  export type InteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Interactions.
     */
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyInput>
    /**
     * Filter which Interactions to update
     */
    where?: InteractionWhereInput
  }

  /**
   * Interaction upsert
   */
  export type InteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the Interaction to update in case it exists.
     */
    where: InteractionWhereUniqueInput
    /**
     * In case the Interaction found by the `where` argument doesn't exist, create a new Interaction with this data.
     */
    create: XOR<InteractionCreateInput, InteractionUncheckedCreateInput>
    /**
     * In case the Interaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InteractionUpdateInput, InteractionUncheckedUpdateInput>
  }

  /**
   * Interaction delete
   */
  export type InteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
    /**
     * Filter which Interaction to delete.
     */
    where: InteractionWhereUniqueInput
  }

  /**
   * Interaction deleteMany
   */
  export type InteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Interactions to delete
     */
    where?: InteractionWhereInput
  }

  /**
   * Interaction without action
   */
  export type InteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Interaction
     */
    select?: InteractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InteractionInclude<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    key: string
    value: string
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }


  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const settingWithKeyOnly = await prisma.setting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `key`
     * const settingWithKeyOnly = await prisma.setting.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */ 
  interface SettingFieldRefs {
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'String'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    avatarUrl: 'avatarUrl',
    bio: 'bio',
    city: 'city',
    phone: 'phone',
    isPremium: 'isPremium',
    premiumUntil: 'premiumUntil',
    score: 'score',
    rating: 'rating',
    swapsCompleted: 'swapsCompleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    icon: 'icon',
    description: 'description',
    parentId: 'parentId',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    title: 'title',
    description: 'description',
    condition: 'condition',
    estimatedValue: 'estimatedValue',
    location: 'location',
    status: 'status',
    isFeatured: 'isFeatured',
    isPopular: 'isPopular',
    viewCount: 'viewCount',
    qualityScore: 'qualityScore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const ItemImageScalarFieldEnum: {
    id: 'id',
    itemId: 'itemId',
    imageUrl: 'imageUrl',
    isPrimary: 'isPrimary',
    displayOrder: 'displayOrder',
    createdAt: 'createdAt'
  };

  export type ItemImageScalarFieldEnum = (typeof ItemImageScalarFieldEnum)[keyof typeof ItemImageScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    status: 'status',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const TradeItemScalarFieldEnum: {
    id: 'id',
    tradeId: 'tradeId',
    itemId: 'itemId',
    side: 'side'
  };

  export type TradeItemScalarFieldEnum = (typeof TradeItemScalarFieldEnum)[keyof typeof TradeItemScalarFieldEnum]


  export const FavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    itemId: 'itemId',
    createdAt: 'createdAt'
  };

  export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum]


  export const MessageRoomScalarFieldEnum: {
    id: 'id',
    user1Id: 'user1Id',
    user2Id: 'user2Id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageRoomScalarFieldEnum = (typeof MessageRoomScalarFieldEnum)[keyof typeof MessageRoomScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    senderId: 'senderId',
    content: 'content',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    isRead: 'isRead',
    data: 'data',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AddressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    address: 'address',
    city: 'city',
    type: 'type',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum]


  export const InteractionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    itemId: 'itemId',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type InteractionScalarFieldEnum = (typeof InteractionScalarFieldEnum)[keyof typeof InteractionScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
    items?: ItemListRelationFilter
    sentTrades?: TradeListRelationFilter
    receivedTrades?: TradeListRelationFilter
    favorites?: FavoriteListRelationFilter
    sentMessages?: MessageListRelationFilter
    rooms1?: MessageRoomListRelationFilter
    rooms2?: MessageRoomListRelationFilter
    notifications?: NotificationListRelationFilter
    addresses?: AddressListRelationFilter
    interactions?: InteractionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: ProfileOrderByWithRelationInput
    items?: ItemOrderByRelationAggregateInput
    sentTrades?: TradeOrderByRelationAggregateInput
    receivedTrades?: TradeOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    sentMessages?: MessageOrderByRelationAggregateInput
    rooms1?: MessageRoomOrderByRelationAggregateInput
    rooms2?: MessageRoomOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    addresses?: AddressOrderByRelationAggregateInput
    interactions?: InteractionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    profile?: XOR<ProfileNullableRelationFilter, ProfileWhereInput> | null
    items?: ItemListRelationFilter
    sentTrades?: TradeListRelationFilter
    receivedTrades?: TradeListRelationFilter
    favorites?: FavoriteListRelationFilter
    sentMessages?: MessageListRelationFilter
    rooms1?: MessageRoomListRelationFilter
    rooms2?: MessageRoomListRelationFilter
    notifications?: NotificationListRelationFilter
    addresses?: AddressListRelationFilter
    interactions?: InteractionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    userId?: StringFilter<"Profile"> | string
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    city?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    isPremium?: BoolFilter<"Profile"> | boolean
    premiumUntil?: DateTimeNullableFilter<"Profile"> | Date | string | null
    score?: IntFilter<"Profile"> | number
    rating?: FloatFilter<"Profile"> | number
    swapsCompleted?: IntFilter<"Profile"> | number
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrderInput | SortOrder
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    firstName?: StringFilter<"Profile"> | string
    lastName?: StringFilter<"Profile"> | string
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    bio?: StringNullableFilter<"Profile"> | string | null
    city?: StringNullableFilter<"Profile"> | string | null
    phone?: StringNullableFilter<"Profile"> | string | null
    isPremium?: BoolFilter<"Profile"> | boolean
    premiumUntil?: DateTimeNullableFilter<"Profile"> | Date | string | null
    score?: IntFilter<"Profile"> | number
    rating?: FloatFilter<"Profile"> | number
    swapsCompleted?: IntFilter<"Profile"> | number
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrderInput | SortOrder
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    userId?: StringWithAggregatesFilter<"Profile"> | string
    firstName?: StringWithAggregatesFilter<"Profile"> | string
    lastName?: StringWithAggregatesFilter<"Profile"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    city?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    isPremium?: BoolWithAggregatesFilter<"Profile"> | boolean
    premiumUntil?: DateTimeNullableWithAggregatesFilter<"Profile"> | Date | string | null
    score?: IntWithAggregatesFilter<"Profile"> | number
    rating?: FloatWithAggregatesFilter<"Profile"> | number
    swapsCompleted?: IntWithAggregatesFilter<"Profile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    icon?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    parentId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    items?: ItemListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    items?: ItemOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    icon?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    parentId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    items?: ItemListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    icon?: StringNullableWithAggregatesFilter<"Category"> | string | null
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    parentId?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: StringFilter<"Item"> | string
    userId?: StringFilter<"Item"> | string
    categoryId?: StringFilter<"Item"> | string
    title?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    condition?: StringFilter<"Item"> | string
    estimatedValue?: FloatNullableFilter<"Item"> | number | null
    location?: StringNullableFilter<"Item"> | string | null
    status?: StringFilter<"Item"> | string
    isFeatured?: BoolFilter<"Item"> | boolean
    isPopular?: BoolFilter<"Item"> | boolean
    viewCount?: IntFilter<"Item"> | number
    qualityScore?: FloatFilter<"Item"> | number
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    images?: ItemImageListRelationFilter
    favorites?: FavoriteListRelationFilter
    tradeItems?: TradeItemListRelationFilter
    interactions?: InteractionListRelationFilter
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    condition?: SortOrder
    estimatedValue?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    isPopular?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    images?: ItemImageOrderByRelationAggregateInput
    favorites?: FavoriteOrderByRelationAggregateInput
    tradeItems?: TradeItemOrderByRelationAggregateInput
    interactions?: InteractionOrderByRelationAggregateInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    userId?: StringFilter<"Item"> | string
    categoryId?: StringFilter<"Item"> | string
    title?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    condition?: StringFilter<"Item"> | string
    estimatedValue?: FloatNullableFilter<"Item"> | number | null
    location?: StringNullableFilter<"Item"> | string | null
    status?: StringFilter<"Item"> | string
    isFeatured?: BoolFilter<"Item"> | boolean
    isPopular?: BoolFilter<"Item"> | boolean
    viewCount?: IntFilter<"Item"> | number
    qualityScore?: FloatFilter<"Item"> | number
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    images?: ItemImageListRelationFilter
    favorites?: FavoriteListRelationFilter
    tradeItems?: TradeItemListRelationFilter
    interactions?: InteractionListRelationFilter
  }, "id">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    condition?: SortOrder
    estimatedValue?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    isPopular?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Item"> | string
    userId?: StringWithAggregatesFilter<"Item"> | string
    categoryId?: StringWithAggregatesFilter<"Item"> | string
    title?: StringWithAggregatesFilter<"Item"> | string
    description?: StringNullableWithAggregatesFilter<"Item"> | string | null
    condition?: StringWithAggregatesFilter<"Item"> | string
    estimatedValue?: FloatNullableWithAggregatesFilter<"Item"> | number | null
    location?: StringNullableWithAggregatesFilter<"Item"> | string | null
    status?: StringWithAggregatesFilter<"Item"> | string
    isFeatured?: BoolWithAggregatesFilter<"Item"> | boolean
    isPopular?: BoolWithAggregatesFilter<"Item"> | boolean
    viewCount?: IntWithAggregatesFilter<"Item"> | number
    qualityScore?: FloatWithAggregatesFilter<"Item"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
  }

  export type ItemImageWhereInput = {
    AND?: ItemImageWhereInput | ItemImageWhereInput[]
    OR?: ItemImageWhereInput[]
    NOT?: ItemImageWhereInput | ItemImageWhereInput[]
    id?: StringFilter<"ItemImage"> | string
    itemId?: StringFilter<"ItemImage"> | string
    imageUrl?: StringFilter<"ItemImage"> | string
    isPrimary?: BoolFilter<"ItemImage"> | boolean
    displayOrder?: IntFilter<"ItemImage"> | number
    createdAt?: DateTimeFilter<"ItemImage"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }

  export type ItemImageOrderByWithRelationInput = {
    id?: SortOrder
    itemId?: SortOrder
    imageUrl?: SortOrder
    isPrimary?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    item?: ItemOrderByWithRelationInput
  }

  export type ItemImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemImageWhereInput | ItemImageWhereInput[]
    OR?: ItemImageWhereInput[]
    NOT?: ItemImageWhereInput | ItemImageWhereInput[]
    itemId?: StringFilter<"ItemImage"> | string
    imageUrl?: StringFilter<"ItemImage"> | string
    isPrimary?: BoolFilter<"ItemImage"> | boolean
    displayOrder?: IntFilter<"ItemImage"> | number
    createdAt?: DateTimeFilter<"ItemImage"> | Date | string
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }, "id">

  export type ItemImageOrderByWithAggregationInput = {
    id?: SortOrder
    itemId?: SortOrder
    imageUrl?: SortOrder
    isPrimary?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
    _count?: ItemImageCountOrderByAggregateInput
    _avg?: ItemImageAvgOrderByAggregateInput
    _max?: ItemImageMaxOrderByAggregateInput
    _min?: ItemImageMinOrderByAggregateInput
    _sum?: ItemImageSumOrderByAggregateInput
  }

  export type ItemImageScalarWhereWithAggregatesInput = {
    AND?: ItemImageScalarWhereWithAggregatesInput | ItemImageScalarWhereWithAggregatesInput[]
    OR?: ItemImageScalarWhereWithAggregatesInput[]
    NOT?: ItemImageScalarWhereWithAggregatesInput | ItemImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItemImage"> | string
    itemId?: StringWithAggregatesFilter<"ItemImage"> | string
    imageUrl?: StringWithAggregatesFilter<"ItemImage"> | string
    isPrimary?: BoolWithAggregatesFilter<"ItemImage"> | boolean
    displayOrder?: IntWithAggregatesFilter<"ItemImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ItemImage"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    senderId?: StringFilter<"Trade"> | string
    receiverId?: StringFilter<"Trade"> | string
    status?: StringFilter<"Trade"> | string
    message?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
    sender?: XOR<UserRelationFilter, UserWhereInput>
    receiver?: XOR<UserRelationFilter, UserWhereInput>
    tradeItems?: TradeItemListRelationFilter
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
    tradeItems?: TradeItemOrderByRelationAggregateInput
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    senderId?: StringFilter<"Trade"> | string
    receiverId?: StringFilter<"Trade"> | string
    status?: StringFilter<"Trade"> | string
    message?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
    sender?: XOR<UserRelationFilter, UserWhereInput>
    receiver?: XOR<UserRelationFilter, UserWhereInput>
    tradeItems?: TradeItemListRelationFilter
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    senderId?: StringWithAggregatesFilter<"Trade"> | string
    receiverId?: StringWithAggregatesFilter<"Trade"> | string
    status?: StringWithAggregatesFilter<"Trade"> | string
    message?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type TradeItemWhereInput = {
    AND?: TradeItemWhereInput | TradeItemWhereInput[]
    OR?: TradeItemWhereInput[]
    NOT?: TradeItemWhereInput | TradeItemWhereInput[]
    id?: StringFilter<"TradeItem"> | string
    tradeId?: StringFilter<"TradeItem"> | string
    itemId?: StringFilter<"TradeItem"> | string
    side?: StringFilter<"TradeItem"> | string
    trade?: XOR<TradeRelationFilter, TradeWhereInput>
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }

  export type TradeItemOrderByWithRelationInput = {
    id?: SortOrder
    tradeId?: SortOrder
    itemId?: SortOrder
    side?: SortOrder
    trade?: TradeOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type TradeItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeItemWhereInput | TradeItemWhereInput[]
    OR?: TradeItemWhereInput[]
    NOT?: TradeItemWhereInput | TradeItemWhereInput[]
    tradeId?: StringFilter<"TradeItem"> | string
    itemId?: StringFilter<"TradeItem"> | string
    side?: StringFilter<"TradeItem"> | string
    trade?: XOR<TradeRelationFilter, TradeWhereInput>
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }, "id">

  export type TradeItemOrderByWithAggregationInput = {
    id?: SortOrder
    tradeId?: SortOrder
    itemId?: SortOrder
    side?: SortOrder
    _count?: TradeItemCountOrderByAggregateInput
    _max?: TradeItemMaxOrderByAggregateInput
    _min?: TradeItemMinOrderByAggregateInput
  }

  export type TradeItemScalarWhereWithAggregatesInput = {
    AND?: TradeItemScalarWhereWithAggregatesInput | TradeItemScalarWhereWithAggregatesInput[]
    OR?: TradeItemScalarWhereWithAggregatesInput[]
    NOT?: TradeItemScalarWhereWithAggregatesInput | TradeItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradeItem"> | string
    tradeId?: StringWithAggregatesFilter<"TradeItem"> | string
    itemId?: StringWithAggregatesFilter<"TradeItem"> | string
    side?: StringWithAggregatesFilter<"TradeItem"> | string
  }

  export type FavoriteWhereInput = {
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    id?: StringFilter<"Favorite"> | string
    userId?: StringFilter<"Favorite"> | string
    itemId?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }

  export type FavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type FavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_itemId?: FavoriteUserIdItemIdCompoundUniqueInput
    AND?: FavoriteWhereInput | FavoriteWhereInput[]
    OR?: FavoriteWhereInput[]
    NOT?: FavoriteWhereInput | FavoriteWhereInput[]
    userId?: StringFilter<"Favorite"> | string
    itemId?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }, "id" | "userId_itemId">

  export type FavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    createdAt?: SortOrder
    _count?: FavoriteCountOrderByAggregateInput
    _max?: FavoriteMaxOrderByAggregateInput
    _min?: FavoriteMinOrderByAggregateInput
  }

  export type FavoriteScalarWhereWithAggregatesInput = {
    AND?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    OR?: FavoriteScalarWhereWithAggregatesInput[]
    NOT?: FavoriteScalarWhereWithAggregatesInput | FavoriteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Favorite"> | string
    userId?: StringWithAggregatesFilter<"Favorite"> | string
    itemId?: StringWithAggregatesFilter<"Favorite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Favorite"> | Date | string
  }

  export type MessageRoomWhereInput = {
    AND?: MessageRoomWhereInput | MessageRoomWhereInput[]
    OR?: MessageRoomWhereInput[]
    NOT?: MessageRoomWhereInput | MessageRoomWhereInput[]
    id?: StringFilter<"MessageRoom"> | string
    user1Id?: StringFilter<"MessageRoom"> | string
    user2Id?: StringFilter<"MessageRoom"> | string
    createdAt?: DateTimeFilter<"MessageRoom"> | Date | string
    updatedAt?: DateTimeFilter<"MessageRoom"> | Date | string
    user1?: XOR<UserRelationFilter, UserWhereInput>
    user2?: XOR<UserRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
  }

  export type MessageRoomOrderByWithRelationInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user1?: UserOrderByWithRelationInput
    user2?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type MessageRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageRoomWhereInput | MessageRoomWhereInput[]
    OR?: MessageRoomWhereInput[]
    NOT?: MessageRoomWhereInput | MessageRoomWhereInput[]
    user1Id?: StringFilter<"MessageRoom"> | string
    user2Id?: StringFilter<"MessageRoom"> | string
    createdAt?: DateTimeFilter<"MessageRoom"> | Date | string
    updatedAt?: DateTimeFilter<"MessageRoom"> | Date | string
    user1?: XOR<UserRelationFilter, UserWhereInput>
    user2?: XOR<UserRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
  }, "id">

  export type MessageRoomOrderByWithAggregationInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageRoomCountOrderByAggregateInput
    _max?: MessageRoomMaxOrderByAggregateInput
    _min?: MessageRoomMinOrderByAggregateInput
  }

  export type MessageRoomScalarWhereWithAggregatesInput = {
    AND?: MessageRoomScalarWhereWithAggregatesInput | MessageRoomScalarWhereWithAggregatesInput[]
    OR?: MessageRoomScalarWhereWithAggregatesInput[]
    NOT?: MessageRoomScalarWhereWithAggregatesInput | MessageRoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MessageRoom"> | string
    user1Id?: StringWithAggregatesFilter<"MessageRoom"> | string
    user2Id?: StringWithAggregatesFilter<"MessageRoom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MessageRoom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MessageRoom"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    roomId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    room?: XOR<MessageRoomRelationFilter, MessageRoomWhereInput>
    sender?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    room?: MessageRoomOrderByWithRelationInput
    sender?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    roomId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    room?: XOR<MessageRoomRelationFilter, MessageRoomWhereInput>
    sender?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    roomId?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    isRead?: BoolWithAggregatesFilter<"Message"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    data?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    isRead?: SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    data?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrderInput | SortOrder
    isRead?: SortOrder
    data?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    data?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    id?: StringFilter<"Address"> | string
    userId?: StringFilter<"Address"> | string
    title?: StringFilter<"Address"> | string
    address?: StringFilter<"Address"> | string
    city?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AddressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    address?: SortOrder
    city?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AddressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    userId?: StringFilter<"Address"> | string
    title?: StringFilter<"Address"> | string
    address?: StringFilter<"Address"> | string
    city?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AddressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    address?: SortOrder
    city?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AddressCountOrderByAggregateInput
    _max?: AddressMaxOrderByAggregateInput
    _min?: AddressMinOrderByAggregateInput
  }

  export type AddressScalarWhereWithAggregatesInput = {
    AND?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    OR?: AddressScalarWhereWithAggregatesInput[]
    NOT?: AddressScalarWhereWithAggregatesInput | AddressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Address"> | string
    userId?: StringWithAggregatesFilter<"Address"> | string
    title?: StringWithAggregatesFilter<"Address"> | string
    address?: StringWithAggregatesFilter<"Address"> | string
    city?: StringWithAggregatesFilter<"Address"> | string
    type?: StringWithAggregatesFilter<"Address"> | string
    isDefault?: BoolWithAggregatesFilter<"Address"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Address"> | Date | string
  }

  export type InteractionWhereInput = {
    AND?: InteractionWhereInput | InteractionWhereInput[]
    OR?: InteractionWhereInput[]
    NOT?: InteractionWhereInput | InteractionWhereInput[]
    id?: StringFilter<"Interaction"> | string
    userId?: StringFilter<"Interaction"> | string
    itemId?: StringFilter<"Interaction"> | string
    type?: StringFilter<"Interaction"> | string
    createdAt?: DateTimeFilter<"Interaction"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }

  export type InteractionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type InteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InteractionWhereInput | InteractionWhereInput[]
    OR?: InteractionWhereInput[]
    NOT?: InteractionWhereInput | InteractionWhereInput[]
    userId?: StringFilter<"Interaction"> | string
    itemId?: StringFilter<"Interaction"> | string
    type?: StringFilter<"Interaction"> | string
    createdAt?: DateTimeFilter<"Interaction"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    item?: XOR<ItemRelationFilter, ItemWhereInput>
  }, "id">

  export type InteractionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: InteractionCountOrderByAggregateInput
    _max?: InteractionMaxOrderByAggregateInput
    _min?: InteractionMinOrderByAggregateInput
  }

  export type InteractionScalarWhereWithAggregatesInput = {
    AND?: InteractionScalarWhereWithAggregatesInput | InteractionScalarWhereWithAggregatesInput[]
    OR?: InteractionScalarWhereWithAggregatesInput[]
    NOT?: InteractionScalarWhereWithAggregatesInput | InteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Interaction"> | string
    userId?: StringWithAggregatesFilter<"Interaction"> | string
    itemId?: StringWithAggregatesFilter<"Interaction"> | string
    type?: StringWithAggregatesFilter<"Interaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Interaction"> | Date | string
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    key?: StringFilter<"Setting"> | string
    value?: StringFilter<"Setting"> | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: StringFilter<"Setting"> | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "key">

  export type SettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: StringWithAggregatesFilter<"Setting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateInput = {
    id?: string
    firstName: string
    lastName: string
    avatarUrl?: string | null
    bio?: string | null
    city?: string | null
    phone?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    score?: number
    rating?: number
    swapsCompleted?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    avatarUrl?: string | null
    bio?: string | null
    city?: string | null
    phone?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    score?: number
    rating?: number
    swapsCompleted?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    swapsCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    swapsCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileCreateManyInput = {
    id?: string
    userId: string
    firstName: string
    lastName: string
    avatarUrl?: string | null
    bio?: string | null
    city?: string | null
    phone?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    score?: number
    rating?: number
    swapsCompleted?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    swapsCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    swapsCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    items?: ItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    items?: ItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    items?: ItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    items?: ItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutItemsInput
    category: CategoryCreateNestedOneWithoutItemsInput
    images?: ItemImageCreateNestedManyWithoutItemInput
    favorites?: FavoriteCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemCreateNestedManyWithoutItemInput
    interactions?: InteractionCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateInput = {
    id?: string
    userId: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ItemImageUncheckedCreateNestedManyWithoutItemInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutItemInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    images?: ItemImageUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUpdateManyWithoutItemNestedInput
    interactions?: InteractionUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ItemImageUncheckedUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUncheckedUpdateManyWithoutItemNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    id?: string
    userId: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemImageCreateInput = {
    id?: string
    imageUrl: string
    isPrimary?: boolean
    displayOrder?: number
    createdAt?: Date | string
    item: ItemCreateNestedOneWithoutImagesInput
  }

  export type ItemImageUncheckedCreateInput = {
    id?: string
    itemId: string
    imageUrl: string
    isPrimary?: boolean
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ItemImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutImagesNestedInput
  }

  export type ItemImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemImageCreateManyInput = {
    id?: string
    itemId: string
    imageUrl: string
    isPrimary?: boolean
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ItemImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    id?: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentTradesInput
    receiver: UserCreateNestedOneWithoutReceivedTradesInput
    tradeItems?: TradeItemCreateNestedManyWithoutTradeInput
  }

  export type TradeUncheckedCreateInput = {
    id?: string
    senderId: string
    receiverId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutTradeInput
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentTradesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedTradesNestedInput
    tradeItems?: TradeItemUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradeItems?: TradeItemUncheckedUpdateManyWithoutTradeNestedInput
  }

  export type TradeCreateManyInput = {
    id?: string
    senderId: string
    receiverId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeItemCreateInput = {
    id?: string
    side: string
    trade: TradeCreateNestedOneWithoutTradeItemsInput
    item: ItemCreateNestedOneWithoutTradeItemsInput
  }

  export type TradeItemUncheckedCreateInput = {
    id?: string
    tradeId: string
    itemId: string
    side: string
  }

  export type TradeItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    trade?: TradeUpdateOneRequiredWithoutTradeItemsNestedInput
    item?: ItemUpdateOneRequiredWithoutTradeItemsNestedInput
  }

  export type TradeItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type TradeItemCreateManyInput = {
    id?: string
    tradeId: string
    itemId: string
    side: string
  }

  export type TradeItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type TradeItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type FavoriteCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    item: ItemCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateInput = {
    id?: string
    userId: string
    itemId: string
    createdAt?: Date | string
  }

  export type FavoriteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    item?: ItemUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteCreateManyInput = {
    id?: string
    userId: string
    itemId: string
    createdAt?: Date | string
  }

  export type FavoriteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRoomCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user1: UserCreateNestedOneWithoutRooms1Input
    user2: UserCreateNestedOneWithoutRooms2Input
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type MessageRoomUncheckedCreateInput = {
    id?: string
    user1Id: string
    user2Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type MessageRoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user1?: UserUpdateOneRequiredWithoutRooms1NestedInput
    user2?: UserUpdateOneRequiredWithoutRooms2NestedInput
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type MessageRoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type MessageRoomCreateManyInput = {
    id?: string
    user1Id: string
    user2Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageRoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    room: MessageRoomCreateNestedOneWithoutMessagesInput
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    roomId: string
    senderId: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: MessageRoomUpdateOneRequiredWithoutMessagesNestedInput
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    roomId: string
    senderId: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    type: string
    title: string
    body?: string | null
    isRead?: boolean
    data?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    title: string
    body?: string | null
    isRead?: boolean
    data?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: string
    title: string
    body?: string | null
    isRead?: boolean
    data?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateInput = {
    id?: string
    title: string
    address: string
    city: string
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAddressesInput
  }

  export type AddressUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    address: string
    city: string
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAddressesNestedInput
  }

  export type AddressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressCreateManyInput = {
    id?: string
    userId: string
    title: string
    address: string
    city: string
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InteractionCreateInput = {
    id?: string
    type: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInteractionsInput
    item: ItemCreateNestedOneWithoutInteractionsInput
  }

  export type InteractionUncheckedCreateInput = {
    id?: string
    userId: string
    itemId: string
    type: string
    createdAt?: Date | string
  }

  export type InteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput
    item?: ItemUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type InteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InteractionCreateManyInput = {
    id?: string
    userId: string
    itemId: string
    type: string
    createdAt?: Date | string
  }

  export type InteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProfileNullableRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type TradeListRelationFilter = {
    every?: TradeWhereInput
    some?: TradeWhereInput
    none?: TradeWhereInput
  }

  export type FavoriteListRelationFilter = {
    every?: FavoriteWhereInput
    some?: FavoriteWhereInput
    none?: FavoriteWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageRoomListRelationFilter = {
    every?: MessageRoomWhereInput
    some?: MessageRoomWhereInput
    none?: MessageRoomWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type AddressListRelationFilter = {
    every?: AddressWhereInput
    some?: AddressWhereInput
    none?: AddressWhereInput
  }

  export type InteractionListRelationFilter = {
    every?: InteractionWhereInput
    some?: InteractionWhereInput
    none?: InteractionWhereInput
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MessageRoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AddressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrder
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrder
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    avatarUrl?: SortOrder
    bio?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrder
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    score?: SortOrder
    rating?: SortOrder
    swapsCompleted?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    icon?: SortOrder
    description?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ItemImageListRelationFilter = {
    every?: ItemImageWhereInput
    some?: ItemImageWhereInput
    none?: ItemImageWhereInput
  }

  export type TradeItemListRelationFilter = {
    every?: TradeItemWhereInput
    some?: TradeItemWhereInput
    none?: TradeItemWhereInput
  }

  export type ItemImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TradeItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    condition?: SortOrder
    estimatedValue?: SortOrder
    location?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    isPopular?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    estimatedValue?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    condition?: SortOrder
    estimatedValue?: SortOrder
    location?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    isPopular?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    condition?: SortOrder
    estimatedValue?: SortOrder
    location?: SortOrder
    status?: SortOrder
    isFeatured?: SortOrder
    isPopular?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    estimatedValue?: SortOrder
    viewCount?: SortOrder
    qualityScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ItemRelationFilter = {
    is?: ItemWhereInput
    isNot?: ItemWhereInput
  }

  export type ItemImageCountOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    imageUrl?: SortOrder
    isPrimary?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemImageAvgOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type ItemImageMaxOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    imageUrl?: SortOrder
    isPrimary?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemImageMinOrderByAggregateInput = {
    id?: SortOrder
    itemId?: SortOrder
    imageUrl?: SortOrder
    isPrimary?: SortOrder
    displayOrder?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemImageSumOrderByAggregateInput = {
    displayOrder?: SortOrder
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeRelationFilter = {
    is?: TradeWhereInput
    isNot?: TradeWhereInput
  }

  export type TradeItemCountOrderByAggregateInput = {
    id?: SortOrder
    tradeId?: SortOrder
    itemId?: SortOrder
    side?: SortOrder
  }

  export type TradeItemMaxOrderByAggregateInput = {
    id?: SortOrder
    tradeId?: SortOrder
    itemId?: SortOrder
    side?: SortOrder
  }

  export type TradeItemMinOrderByAggregateInput = {
    id?: SortOrder
    tradeId?: SortOrder
    itemId?: SortOrder
    side?: SortOrder
  }

  export type FavoriteUserIdItemIdCompoundUniqueInput = {
    userId: string
    itemId: string
  }

  export type FavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    createdAt?: SortOrder
  }

  export type FavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageRoomCountOrderByAggregateInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageRoomMinOrderByAggregateInput = {
    id?: SortOrder
    user1Id?: SortOrder
    user2Id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageRoomRelationFilter = {
    is?: MessageRoomWhereInput
    isNot?: MessageRoomWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    senderId?: SortOrder
    content?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    body?: SortOrder
    isRead?: SortOrder
    data?: SortOrder
    createdAt?: SortOrder
  }

  export type AddressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    address?: SortOrder
    city?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    address?: SortOrder
    city?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AddressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    address?: SortOrder
    city?: SortOrder
    type?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InteractionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type InteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type InteractionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemId?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type SettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ItemCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutSenderInput = {
    create?: XOR<TradeCreateWithoutSenderInput, TradeUncheckedCreateWithoutSenderInput> | TradeCreateWithoutSenderInput[] | TradeUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSenderInput | TradeCreateOrConnectWithoutSenderInput[]
    createMany?: TradeCreateManySenderInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TradeCreateNestedManyWithoutReceiverInput = {
    create?: XOR<TradeCreateWithoutReceiverInput, TradeUncheckedCreateWithoutReceiverInput> | TradeCreateWithoutReceiverInput[] | TradeUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutReceiverInput | TradeCreateOrConnectWithoutReceiverInput[]
    createMany?: TradeCreateManyReceiverInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageRoomCreateNestedManyWithoutUser1Input = {
    create?: XOR<MessageRoomCreateWithoutUser1Input, MessageRoomUncheckedCreateWithoutUser1Input> | MessageRoomCreateWithoutUser1Input[] | MessageRoomUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser1Input | MessageRoomCreateOrConnectWithoutUser1Input[]
    createMany?: MessageRoomCreateManyUser1InputEnvelope
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
  }

  export type MessageRoomCreateNestedManyWithoutUser2Input = {
    create?: XOR<MessageRoomCreateWithoutUser2Input, MessageRoomUncheckedCreateWithoutUser2Input> | MessageRoomCreateWithoutUser2Input[] | MessageRoomUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser2Input | MessageRoomCreateOrConnectWithoutUser2Input[]
    createMany?: MessageRoomCreateManyUser2InputEnvelope
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AddressCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type InteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput> | InteractionCreateWithoutUserInput[] | InteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutUserInput | InteractionCreateOrConnectWithoutUserInput[]
    createMany?: InteractionCreateManyUserInputEnvelope
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type ItemUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<TradeCreateWithoutSenderInput, TradeUncheckedCreateWithoutSenderInput> | TradeCreateWithoutSenderInput[] | TradeUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSenderInput | TradeCreateOrConnectWithoutSenderInput[]
    createMany?: TradeCreateManySenderInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type TradeUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<TradeCreateWithoutReceiverInput, TradeUncheckedCreateWithoutReceiverInput> | TradeCreateWithoutReceiverInput[] | TradeUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutReceiverInput | TradeCreateOrConnectWithoutReceiverInput[]
    createMany?: TradeCreateManyReceiverInputEnvelope
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageRoomUncheckedCreateNestedManyWithoutUser1Input = {
    create?: XOR<MessageRoomCreateWithoutUser1Input, MessageRoomUncheckedCreateWithoutUser1Input> | MessageRoomCreateWithoutUser1Input[] | MessageRoomUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser1Input | MessageRoomCreateOrConnectWithoutUser1Input[]
    createMany?: MessageRoomCreateManyUser1InputEnvelope
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
  }

  export type MessageRoomUncheckedCreateNestedManyWithoutUser2Input = {
    create?: XOR<MessageRoomCreateWithoutUser2Input, MessageRoomUncheckedCreateWithoutUser2Input> | MessageRoomCreateWithoutUser2Input[] | MessageRoomUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser2Input | MessageRoomCreateOrConnectWithoutUser2Input[]
    createMany?: MessageRoomCreateManyUser2InputEnvelope
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type AddressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
  }

  export type InteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput> | InteractionCreateWithoutUserInput[] | InteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutUserInput | InteractionCreateOrConnectWithoutUserInput[]
    createMany?: InteractionCreateManyUserInputEnvelope
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ItemUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutUserInput | ItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutUserInput | ItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutUserInput | ItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TradeCreateWithoutSenderInput, TradeUncheckedCreateWithoutSenderInput> | TradeCreateWithoutSenderInput[] | TradeUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSenderInput | TradeCreateOrConnectWithoutSenderInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutSenderInput | TradeUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TradeCreateManySenderInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutSenderInput | TradeUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutSenderInput | TradeUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TradeUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<TradeCreateWithoutReceiverInput, TradeUncheckedCreateWithoutReceiverInput> | TradeCreateWithoutReceiverInput[] | TradeUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutReceiverInput | TradeCreateOrConnectWithoutReceiverInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutReceiverInput | TradeUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: TradeCreateManyReceiverInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutReceiverInput | TradeUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutReceiverInput | TradeUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageRoomUpdateManyWithoutUser1NestedInput = {
    create?: XOR<MessageRoomCreateWithoutUser1Input, MessageRoomUncheckedCreateWithoutUser1Input> | MessageRoomCreateWithoutUser1Input[] | MessageRoomUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser1Input | MessageRoomCreateOrConnectWithoutUser1Input[]
    upsert?: MessageRoomUpsertWithWhereUniqueWithoutUser1Input | MessageRoomUpsertWithWhereUniqueWithoutUser1Input[]
    createMany?: MessageRoomCreateManyUser1InputEnvelope
    set?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    disconnect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    delete?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    update?: MessageRoomUpdateWithWhereUniqueWithoutUser1Input | MessageRoomUpdateWithWhereUniqueWithoutUser1Input[]
    updateMany?: MessageRoomUpdateManyWithWhereWithoutUser1Input | MessageRoomUpdateManyWithWhereWithoutUser1Input[]
    deleteMany?: MessageRoomScalarWhereInput | MessageRoomScalarWhereInput[]
  }

  export type MessageRoomUpdateManyWithoutUser2NestedInput = {
    create?: XOR<MessageRoomCreateWithoutUser2Input, MessageRoomUncheckedCreateWithoutUser2Input> | MessageRoomCreateWithoutUser2Input[] | MessageRoomUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser2Input | MessageRoomCreateOrConnectWithoutUser2Input[]
    upsert?: MessageRoomUpsertWithWhereUniqueWithoutUser2Input | MessageRoomUpsertWithWhereUniqueWithoutUser2Input[]
    createMany?: MessageRoomCreateManyUser2InputEnvelope
    set?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    disconnect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    delete?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    update?: MessageRoomUpdateWithWhereUniqueWithoutUser2Input | MessageRoomUpdateWithWhereUniqueWithoutUser2Input[]
    updateMany?: MessageRoomUpdateManyWithWhereWithoutUser2Input | MessageRoomUpdateManyWithWhereWithoutUser2Input[]
    deleteMany?: MessageRoomScalarWhereInput | MessageRoomScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AddressUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type InteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput> | InteractionCreateWithoutUserInput[] | InteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutUserInput | InteractionCreateOrConnectWithoutUserInput[]
    upsert?: InteractionUpsertWithWhereUniqueWithoutUserInput | InteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InteractionCreateManyUserInputEnvelope
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    update?: InteractionUpdateWithWhereUniqueWithoutUserInput | InteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InteractionUpdateManyWithWhereWithoutUserInput | InteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[]
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: ProfileWhereInput | boolean
    delete?: ProfileWhereInput | boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutUserInput, ProfileUpdateWithoutUserInput>, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ItemUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput> | ItemCreateWithoutUserInput[] | ItemUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutUserInput | ItemCreateOrConnectWithoutUserInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutUserInput | ItemUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemCreateManyUserInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutUserInput | ItemUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutUserInput | ItemUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<TradeCreateWithoutSenderInput, TradeUncheckedCreateWithoutSenderInput> | TradeCreateWithoutSenderInput[] | TradeUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutSenderInput | TradeCreateOrConnectWithoutSenderInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutSenderInput | TradeUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: TradeCreateManySenderInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutSenderInput | TradeUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutSenderInput | TradeUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type TradeUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<TradeCreateWithoutReceiverInput, TradeUncheckedCreateWithoutReceiverInput> | TradeCreateWithoutReceiverInput[] | TradeUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: TradeCreateOrConnectWithoutReceiverInput | TradeCreateOrConnectWithoutReceiverInput[]
    upsert?: TradeUpsertWithWhereUniqueWithoutReceiverInput | TradeUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: TradeCreateManyReceiverInputEnvelope
    set?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    disconnect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    delete?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    connect?: TradeWhereUniqueInput | TradeWhereUniqueInput[]
    update?: TradeUpdateWithWhereUniqueWithoutReceiverInput | TradeUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: TradeUpdateManyWithWhereWithoutReceiverInput | TradeUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: TradeScalarWhereInput | TradeScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput> | FavoriteCreateWithoutUserInput[] | FavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutUserInput | FavoriteCreateOrConnectWithoutUserInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutUserInput | FavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FavoriteCreateManyUserInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutUserInput | FavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutUserInput | FavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageRoomUncheckedUpdateManyWithoutUser1NestedInput = {
    create?: XOR<MessageRoomCreateWithoutUser1Input, MessageRoomUncheckedCreateWithoutUser1Input> | MessageRoomCreateWithoutUser1Input[] | MessageRoomUncheckedCreateWithoutUser1Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser1Input | MessageRoomCreateOrConnectWithoutUser1Input[]
    upsert?: MessageRoomUpsertWithWhereUniqueWithoutUser1Input | MessageRoomUpsertWithWhereUniqueWithoutUser1Input[]
    createMany?: MessageRoomCreateManyUser1InputEnvelope
    set?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    disconnect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    delete?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    update?: MessageRoomUpdateWithWhereUniqueWithoutUser1Input | MessageRoomUpdateWithWhereUniqueWithoutUser1Input[]
    updateMany?: MessageRoomUpdateManyWithWhereWithoutUser1Input | MessageRoomUpdateManyWithWhereWithoutUser1Input[]
    deleteMany?: MessageRoomScalarWhereInput | MessageRoomScalarWhereInput[]
  }

  export type MessageRoomUncheckedUpdateManyWithoutUser2NestedInput = {
    create?: XOR<MessageRoomCreateWithoutUser2Input, MessageRoomUncheckedCreateWithoutUser2Input> | MessageRoomCreateWithoutUser2Input[] | MessageRoomUncheckedCreateWithoutUser2Input[]
    connectOrCreate?: MessageRoomCreateOrConnectWithoutUser2Input | MessageRoomCreateOrConnectWithoutUser2Input[]
    upsert?: MessageRoomUpsertWithWhereUniqueWithoutUser2Input | MessageRoomUpsertWithWhereUniqueWithoutUser2Input[]
    createMany?: MessageRoomCreateManyUser2InputEnvelope
    set?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    disconnect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    delete?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    connect?: MessageRoomWhereUniqueInput | MessageRoomWhereUniqueInput[]
    update?: MessageRoomUpdateWithWhereUniqueWithoutUser2Input | MessageRoomUpdateWithWhereUniqueWithoutUser2Input[]
    updateMany?: MessageRoomUpdateManyWithWhereWithoutUser2Input | MessageRoomUpdateManyWithWhereWithoutUser2Input[]
    deleteMany?: MessageRoomScalarWhereInput | MessageRoomScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type AddressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput> | AddressCreateWithoutUserInput[] | AddressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AddressCreateOrConnectWithoutUserInput | AddressCreateOrConnectWithoutUserInput[]
    upsert?: AddressUpsertWithWhereUniqueWithoutUserInput | AddressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AddressCreateManyUserInputEnvelope
    set?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    disconnect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    delete?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    connect?: AddressWhereUniqueInput | AddressWhereUniqueInput[]
    update?: AddressUpdateWithWhereUniqueWithoutUserInput | AddressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AddressUpdateManyWithWhereWithoutUserInput | AddressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AddressScalarWhereInput | AddressScalarWhereInput[]
  }

  export type InteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput> | InteractionCreateWithoutUserInput[] | InteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutUserInput | InteractionCreateOrConnectWithoutUserInput[]
    upsert?: InteractionUpsertWithWhereUniqueWithoutUserInput | InteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InteractionCreateManyUserInputEnvelope
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    update?: InteractionUpdateWithWhereUniqueWithoutUserInput | InteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InteractionUpdateManyWithWhereWithoutUserInput | InteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutCategoryInput | ItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutCategoryInput | ItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutCategoryInput | ItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput> | ItemCreateWithoutCategoryInput[] | ItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCategoryInput | ItemCreateOrConnectWithoutCategoryInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutCategoryInput | ItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ItemCreateManyCategoryInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutCategoryInput | ItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutCategoryInput | ItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutItemsInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutItemsInput = {
    create?: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutItemsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ItemImageCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemImageCreateWithoutItemInput, ItemImageUncheckedCreateWithoutItemInput> | ItemImageCreateWithoutItemInput[] | ItemImageUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemImageCreateOrConnectWithoutItemInput | ItemImageCreateOrConnectWithoutItemInput[]
    createMany?: ItemImageCreateManyItemInputEnvelope
    connect?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
  }

  export type FavoriteCreateNestedManyWithoutItemInput = {
    create?: XOR<FavoriteCreateWithoutItemInput, FavoriteUncheckedCreateWithoutItemInput> | FavoriteCreateWithoutItemInput[] | FavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutItemInput | FavoriteCreateOrConnectWithoutItemInput[]
    createMany?: FavoriteCreateManyItemInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type TradeItemCreateNestedManyWithoutItemInput = {
    create?: XOR<TradeItemCreateWithoutItemInput, TradeItemUncheckedCreateWithoutItemInput> | TradeItemCreateWithoutItemInput[] | TradeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutItemInput | TradeItemCreateOrConnectWithoutItemInput[]
    createMany?: TradeItemCreateManyItemInputEnvelope
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
  }

  export type InteractionCreateNestedManyWithoutItemInput = {
    create?: XOR<InteractionCreateWithoutItemInput, InteractionUncheckedCreateWithoutItemInput> | InteractionCreateWithoutItemInput[] | InteractionUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutItemInput | InteractionCreateOrConnectWithoutItemInput[]
    createMany?: InteractionCreateManyItemInputEnvelope
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
  }

  export type ItemImageUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemImageCreateWithoutItemInput, ItemImageUncheckedCreateWithoutItemInput> | ItemImageCreateWithoutItemInput[] | ItemImageUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemImageCreateOrConnectWithoutItemInput | ItemImageCreateOrConnectWithoutItemInput[]
    createMany?: ItemImageCreateManyItemInputEnvelope
    connect?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
  }

  export type FavoriteUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<FavoriteCreateWithoutItemInput, FavoriteUncheckedCreateWithoutItemInput> | FavoriteCreateWithoutItemInput[] | FavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutItemInput | FavoriteCreateOrConnectWithoutItemInput[]
    createMany?: FavoriteCreateManyItemInputEnvelope
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
  }

  export type TradeItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<TradeItemCreateWithoutItemInput, TradeItemUncheckedCreateWithoutItemInput> | TradeItemCreateWithoutItemInput[] | TradeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutItemInput | TradeItemCreateOrConnectWithoutItemInput[]
    createMany?: TradeItemCreateManyItemInputEnvelope
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
  }

  export type InteractionUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<InteractionCreateWithoutItemInput, InteractionUncheckedCreateWithoutItemInput> | InteractionCreateWithoutItemInput[] | InteractionUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutItemInput | InteractionCreateOrConnectWithoutItemInput[]
    createMany?: InteractionCreateManyItemInputEnvelope
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutItemsInput
    upsert?: UserUpsertWithoutItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutItemsInput, UserUpdateWithoutItemsInput>, UserUncheckedUpdateWithoutItemsInput>
  }

  export type CategoryUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutItemsInput
    upsert?: CategoryUpsertWithoutItemsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutItemsInput, CategoryUpdateWithoutItemsInput>, CategoryUncheckedUpdateWithoutItemsInput>
  }

  export type ItemImageUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemImageCreateWithoutItemInput, ItemImageUncheckedCreateWithoutItemInput> | ItemImageCreateWithoutItemInput[] | ItemImageUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemImageCreateOrConnectWithoutItemInput | ItemImageCreateOrConnectWithoutItemInput[]
    upsert?: ItemImageUpsertWithWhereUniqueWithoutItemInput | ItemImageUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemImageCreateManyItemInputEnvelope
    set?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    disconnect?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    delete?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    connect?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    update?: ItemImageUpdateWithWhereUniqueWithoutItemInput | ItemImageUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemImageUpdateManyWithWhereWithoutItemInput | ItemImageUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemImageScalarWhereInput | ItemImageScalarWhereInput[]
  }

  export type FavoriteUpdateManyWithoutItemNestedInput = {
    create?: XOR<FavoriteCreateWithoutItemInput, FavoriteUncheckedCreateWithoutItemInput> | FavoriteCreateWithoutItemInput[] | FavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutItemInput | FavoriteCreateOrConnectWithoutItemInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutItemInput | FavoriteUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: FavoriteCreateManyItemInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutItemInput | FavoriteUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutItemInput | FavoriteUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type TradeItemUpdateManyWithoutItemNestedInput = {
    create?: XOR<TradeItemCreateWithoutItemInput, TradeItemUncheckedCreateWithoutItemInput> | TradeItemCreateWithoutItemInput[] | TradeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutItemInput | TradeItemCreateOrConnectWithoutItemInput[]
    upsert?: TradeItemUpsertWithWhereUniqueWithoutItemInput | TradeItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: TradeItemCreateManyItemInputEnvelope
    set?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    disconnect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    delete?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    update?: TradeItemUpdateWithWhereUniqueWithoutItemInput | TradeItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: TradeItemUpdateManyWithWhereWithoutItemInput | TradeItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: TradeItemScalarWhereInput | TradeItemScalarWhereInput[]
  }

  export type InteractionUpdateManyWithoutItemNestedInput = {
    create?: XOR<InteractionCreateWithoutItemInput, InteractionUncheckedCreateWithoutItemInput> | InteractionCreateWithoutItemInput[] | InteractionUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutItemInput | InteractionCreateOrConnectWithoutItemInput[]
    upsert?: InteractionUpsertWithWhereUniqueWithoutItemInput | InteractionUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: InteractionCreateManyItemInputEnvelope
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    update?: InteractionUpdateWithWhereUniqueWithoutItemInput | InteractionUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: InteractionUpdateManyWithWhereWithoutItemInput | InteractionUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[]
  }

  export type ItemImageUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemImageCreateWithoutItemInput, ItemImageUncheckedCreateWithoutItemInput> | ItemImageCreateWithoutItemInput[] | ItemImageUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemImageCreateOrConnectWithoutItemInput | ItemImageCreateOrConnectWithoutItemInput[]
    upsert?: ItemImageUpsertWithWhereUniqueWithoutItemInput | ItemImageUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemImageCreateManyItemInputEnvelope
    set?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    disconnect?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    delete?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    connect?: ItemImageWhereUniqueInput | ItemImageWhereUniqueInput[]
    update?: ItemImageUpdateWithWhereUniqueWithoutItemInput | ItemImageUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemImageUpdateManyWithWhereWithoutItemInput | ItemImageUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemImageScalarWhereInput | ItemImageScalarWhereInput[]
  }

  export type FavoriteUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<FavoriteCreateWithoutItemInput, FavoriteUncheckedCreateWithoutItemInput> | FavoriteCreateWithoutItemInput[] | FavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: FavoriteCreateOrConnectWithoutItemInput | FavoriteCreateOrConnectWithoutItemInput[]
    upsert?: FavoriteUpsertWithWhereUniqueWithoutItemInput | FavoriteUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: FavoriteCreateManyItemInputEnvelope
    set?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    disconnect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    delete?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    connect?: FavoriteWhereUniqueInput | FavoriteWhereUniqueInput[]
    update?: FavoriteUpdateWithWhereUniqueWithoutItemInput | FavoriteUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: FavoriteUpdateManyWithWhereWithoutItemInput | FavoriteUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
  }

  export type TradeItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<TradeItemCreateWithoutItemInput, TradeItemUncheckedCreateWithoutItemInput> | TradeItemCreateWithoutItemInput[] | TradeItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutItemInput | TradeItemCreateOrConnectWithoutItemInput[]
    upsert?: TradeItemUpsertWithWhereUniqueWithoutItemInput | TradeItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: TradeItemCreateManyItemInputEnvelope
    set?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    disconnect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    delete?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    update?: TradeItemUpdateWithWhereUniqueWithoutItemInput | TradeItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: TradeItemUpdateManyWithWhereWithoutItemInput | TradeItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: TradeItemScalarWhereInput | TradeItemScalarWhereInput[]
  }

  export type InteractionUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<InteractionCreateWithoutItemInput, InteractionUncheckedCreateWithoutItemInput> | InteractionCreateWithoutItemInput[] | InteractionUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InteractionCreateOrConnectWithoutItemInput | InteractionCreateOrConnectWithoutItemInput[]
    upsert?: InteractionUpsertWithWhereUniqueWithoutItemInput | InteractionUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: InteractionCreateManyItemInputEnvelope
    set?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    disconnect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    delete?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    connect?: InteractionWhereUniqueInput | InteractionWhereUniqueInput[]
    update?: InteractionUpdateWithWhereUniqueWithoutItemInput | InteractionUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: InteractionUpdateManyWithWhereWithoutItemInput | InteractionUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: InteractionScalarWhereInput | InteractionScalarWhereInput[]
  }

  export type ItemCreateNestedOneWithoutImagesInput = {
    create?: XOR<ItemCreateWithoutImagesInput, ItemUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutImagesInput
    connect?: ItemWhereUniqueInput
  }

  export type ItemUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<ItemCreateWithoutImagesInput, ItemUncheckedCreateWithoutImagesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutImagesInput
    upsert?: ItemUpsertWithoutImagesInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutImagesInput, ItemUpdateWithoutImagesInput>, ItemUncheckedUpdateWithoutImagesInput>
  }

  export type UserCreateNestedOneWithoutSentTradesInput = {
    create?: XOR<UserCreateWithoutSentTradesInput, UserUncheckedCreateWithoutSentTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentTradesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedTradesInput = {
    create?: XOR<UserCreateWithoutReceivedTradesInput, UserUncheckedCreateWithoutReceivedTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedTradesInput
    connect?: UserWhereUniqueInput
  }

  export type TradeItemCreateNestedManyWithoutTradeInput = {
    create?: XOR<TradeItemCreateWithoutTradeInput, TradeItemUncheckedCreateWithoutTradeInput> | TradeItemCreateWithoutTradeInput[] | TradeItemUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutTradeInput | TradeItemCreateOrConnectWithoutTradeInput[]
    createMany?: TradeItemCreateManyTradeInputEnvelope
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
  }

  export type TradeItemUncheckedCreateNestedManyWithoutTradeInput = {
    create?: XOR<TradeItemCreateWithoutTradeInput, TradeItemUncheckedCreateWithoutTradeInput> | TradeItemCreateWithoutTradeInput[] | TradeItemUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutTradeInput | TradeItemCreateOrConnectWithoutTradeInput[]
    createMany?: TradeItemCreateManyTradeInputEnvelope
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSentTradesNestedInput = {
    create?: XOR<UserCreateWithoutSentTradesInput, UserUncheckedCreateWithoutSentTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentTradesInput
    upsert?: UserUpsertWithoutSentTradesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentTradesInput, UserUpdateWithoutSentTradesInput>, UserUncheckedUpdateWithoutSentTradesInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedTradesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedTradesInput, UserUncheckedCreateWithoutReceivedTradesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedTradesInput
    upsert?: UserUpsertWithoutReceivedTradesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedTradesInput, UserUpdateWithoutReceivedTradesInput>, UserUncheckedUpdateWithoutReceivedTradesInput>
  }

  export type TradeItemUpdateManyWithoutTradeNestedInput = {
    create?: XOR<TradeItemCreateWithoutTradeInput, TradeItemUncheckedCreateWithoutTradeInput> | TradeItemCreateWithoutTradeInput[] | TradeItemUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutTradeInput | TradeItemCreateOrConnectWithoutTradeInput[]
    upsert?: TradeItemUpsertWithWhereUniqueWithoutTradeInput | TradeItemUpsertWithWhereUniqueWithoutTradeInput[]
    createMany?: TradeItemCreateManyTradeInputEnvelope
    set?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    disconnect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    delete?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    update?: TradeItemUpdateWithWhereUniqueWithoutTradeInput | TradeItemUpdateWithWhereUniqueWithoutTradeInput[]
    updateMany?: TradeItemUpdateManyWithWhereWithoutTradeInput | TradeItemUpdateManyWithWhereWithoutTradeInput[]
    deleteMany?: TradeItemScalarWhereInput | TradeItemScalarWhereInput[]
  }

  export type TradeItemUncheckedUpdateManyWithoutTradeNestedInput = {
    create?: XOR<TradeItemCreateWithoutTradeInput, TradeItemUncheckedCreateWithoutTradeInput> | TradeItemCreateWithoutTradeInput[] | TradeItemUncheckedCreateWithoutTradeInput[]
    connectOrCreate?: TradeItemCreateOrConnectWithoutTradeInput | TradeItemCreateOrConnectWithoutTradeInput[]
    upsert?: TradeItemUpsertWithWhereUniqueWithoutTradeInput | TradeItemUpsertWithWhereUniqueWithoutTradeInput[]
    createMany?: TradeItemCreateManyTradeInputEnvelope
    set?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    disconnect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    delete?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    connect?: TradeItemWhereUniqueInput | TradeItemWhereUniqueInput[]
    update?: TradeItemUpdateWithWhereUniqueWithoutTradeInput | TradeItemUpdateWithWhereUniqueWithoutTradeInput[]
    updateMany?: TradeItemUpdateManyWithWhereWithoutTradeInput | TradeItemUpdateManyWithWhereWithoutTradeInput[]
    deleteMany?: TradeItemScalarWhereInput | TradeItemScalarWhereInput[]
  }

  export type TradeCreateNestedOneWithoutTradeItemsInput = {
    create?: XOR<TradeCreateWithoutTradeItemsInput, TradeUncheckedCreateWithoutTradeItemsInput>
    connectOrCreate?: TradeCreateOrConnectWithoutTradeItemsInput
    connect?: TradeWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutTradeItemsInput = {
    create?: XOR<ItemCreateWithoutTradeItemsInput, ItemUncheckedCreateWithoutTradeItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutTradeItemsInput
    connect?: ItemWhereUniqueInput
  }

  export type TradeUpdateOneRequiredWithoutTradeItemsNestedInput = {
    create?: XOR<TradeCreateWithoutTradeItemsInput, TradeUncheckedCreateWithoutTradeItemsInput>
    connectOrCreate?: TradeCreateOrConnectWithoutTradeItemsInput
    upsert?: TradeUpsertWithoutTradeItemsInput
    connect?: TradeWhereUniqueInput
    update?: XOR<XOR<TradeUpdateToOneWithWhereWithoutTradeItemsInput, TradeUpdateWithoutTradeItemsInput>, TradeUncheckedUpdateWithoutTradeItemsInput>
  }

  export type ItemUpdateOneRequiredWithoutTradeItemsNestedInput = {
    create?: XOR<ItemCreateWithoutTradeItemsInput, ItemUncheckedCreateWithoutTradeItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutTradeItemsInput
    upsert?: ItemUpsertWithoutTradeItemsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutTradeItemsInput, ItemUpdateWithoutTradeItemsInput>, ItemUncheckedUpdateWithoutTradeItemsInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutFavoritesInput
    connect?: ItemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type ItemUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutFavoritesInput
    upsert?: ItemUpsertWithoutFavoritesInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutFavoritesInput, ItemUpdateWithoutFavoritesInput>, ItemUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserCreateNestedOneWithoutRooms1Input = {
    create?: XOR<UserCreateWithoutRooms1Input, UserUncheckedCreateWithoutRooms1Input>
    connectOrCreate?: UserCreateOrConnectWithoutRooms1Input
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRooms2Input = {
    create?: XOR<UserCreateWithoutRooms2Input, UserUncheckedCreateWithoutRooms2Input>
    connectOrCreate?: UserCreateOrConnectWithoutRooms2Input
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutRooms1NestedInput = {
    create?: XOR<UserCreateWithoutRooms1Input, UserUncheckedCreateWithoutRooms1Input>
    connectOrCreate?: UserCreateOrConnectWithoutRooms1Input
    upsert?: UserUpsertWithoutRooms1Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRooms1Input, UserUpdateWithoutRooms1Input>, UserUncheckedUpdateWithoutRooms1Input>
  }

  export type UserUpdateOneRequiredWithoutRooms2NestedInput = {
    create?: XOR<UserCreateWithoutRooms2Input, UserUncheckedCreateWithoutRooms2Input>
    connectOrCreate?: UserCreateOrConnectWithoutRooms2Input
    upsert?: UserUpsertWithoutRooms2Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRooms2Input, UserUpdateWithoutRooms2Input>, UserUncheckedUpdateWithoutRooms2Input>
  }

  export type MessageUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput> | MessageCreateWithoutRoomInput[] | MessageUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutRoomInput | MessageCreateOrConnectWithoutRoomInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutRoomInput | MessageUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: MessageCreateManyRoomInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutRoomInput | MessageUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutRoomInput | MessageUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageRoomCreateNestedOneWithoutMessagesInput = {
    create?: XOR<MessageRoomCreateWithoutMessagesInput, MessageRoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: MessageRoomCreateOrConnectWithoutMessagesInput
    connect?: MessageRoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type MessageRoomUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<MessageRoomCreateWithoutMessagesInput, MessageRoomUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: MessageRoomCreateOrConnectWithoutMessagesInput
    upsert?: MessageRoomUpsertWithoutMessagesInput
    connect?: MessageRoomWhereUniqueInput
    update?: XOR<XOR<MessageRoomUpdateToOneWithWhereWithoutMessagesInput, MessageRoomUpdateWithoutMessagesInput>, MessageRoomUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutAddressesInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAddressesNestedInput = {
    create?: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAddressesInput
    upsert?: UserUpsertWithoutAddressesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAddressesInput, UserUpdateWithoutAddressesInput>, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type UserCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<ItemCreateWithoutInteractionsInput, ItemUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutInteractionsInput
    connect?: ItemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInteractionsInput
    upsert?: UserUpsertWithoutInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInteractionsInput, UserUpdateWithoutInteractionsInput>, UserUncheckedUpdateWithoutInteractionsInput>
  }

  export type ItemUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<ItemCreateWithoutInteractionsInput, ItemUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutInteractionsInput
    upsert?: ItemUpsertWithoutInteractionsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutInteractionsInput, ItemUpdateWithoutInteractionsInput>, ItemUncheckedUpdateWithoutInteractionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ProfileCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    avatarUrl?: string | null
    bio?: string | null
    city?: string | null
    phone?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    score?: number
    rating?: number
    swapsCompleted?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    avatarUrl?: string | null
    bio?: string | null
    city?: string | null
    phone?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    score?: number
    rating?: number
    swapsCompleted?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ItemCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutItemsInput
    images?: ItemImageCreateNestedManyWithoutItemInput
    favorites?: FavoriteCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemCreateNestedManyWithoutItemInput
    interactions?: InteractionCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutUserInput = {
    id?: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ItemImageUncheckedCreateNestedManyWithoutItemInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutItemInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutUserInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput>
  }

  export type ItemCreateManyUserInputEnvelope = {
    data: ItemCreateManyUserInput | ItemCreateManyUserInput[]
  }

  export type TradeCreateWithoutSenderInput = {
    id?: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedTradesInput
    tradeItems?: TradeItemCreateNestedManyWithoutTradeInput
  }

  export type TradeUncheckedCreateWithoutSenderInput = {
    id?: string
    receiverId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutTradeInput
  }

  export type TradeCreateOrConnectWithoutSenderInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutSenderInput, TradeUncheckedCreateWithoutSenderInput>
  }

  export type TradeCreateManySenderInputEnvelope = {
    data: TradeCreateManySenderInput | TradeCreateManySenderInput[]
  }

  export type TradeCreateWithoutReceiverInput = {
    id?: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentTradesInput
    tradeItems?: TradeItemCreateNestedManyWithoutTradeInput
  }

  export type TradeUncheckedCreateWithoutReceiverInput = {
    id?: string
    senderId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutTradeInput
  }

  export type TradeCreateOrConnectWithoutReceiverInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutReceiverInput, TradeUncheckedCreateWithoutReceiverInput>
  }

  export type TradeCreateManyReceiverInputEnvelope = {
    data: TradeCreateManyReceiverInput | TradeCreateManyReceiverInput[]
  }

  export type FavoriteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    item: ItemCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutUserInput = {
    id?: string
    itemId: string
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteCreateManyUserInputEnvelope = {
    data: FavoriteCreateManyUserInput | FavoriteCreateManyUserInput[]
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    room: MessageRoomCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    roomId: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
  }

  export type MessageRoomCreateWithoutUser1Input = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user2: UserCreateNestedOneWithoutRooms2Input
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type MessageRoomUncheckedCreateWithoutUser1Input = {
    id?: string
    user2Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type MessageRoomCreateOrConnectWithoutUser1Input = {
    where: MessageRoomWhereUniqueInput
    create: XOR<MessageRoomCreateWithoutUser1Input, MessageRoomUncheckedCreateWithoutUser1Input>
  }

  export type MessageRoomCreateManyUser1InputEnvelope = {
    data: MessageRoomCreateManyUser1Input | MessageRoomCreateManyUser1Input[]
  }

  export type MessageRoomCreateWithoutUser2Input = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user1: UserCreateNestedOneWithoutRooms1Input
    messages?: MessageCreateNestedManyWithoutRoomInput
  }

  export type MessageRoomUncheckedCreateWithoutUser2Input = {
    id?: string
    user1Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutRoomInput
  }

  export type MessageRoomCreateOrConnectWithoutUser2Input = {
    where: MessageRoomWhereUniqueInput
    create: XOR<MessageRoomCreateWithoutUser2Input, MessageRoomUncheckedCreateWithoutUser2Input>
  }

  export type MessageRoomCreateManyUser2InputEnvelope = {
    data: MessageRoomCreateManyUser2Input | MessageRoomCreateManyUser2Input[]
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: string
    title: string
    body?: string | null
    isRead?: boolean
    data?: string | null
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    title: string
    body?: string | null
    isRead?: boolean
    data?: string | null
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
  }

  export type AddressCreateWithoutUserInput = {
    id?: string
    title: string
    address: string
    city: string
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    address: string
    city: string
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AddressCreateOrConnectWithoutUserInput = {
    where: AddressWhereUniqueInput
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressCreateManyUserInputEnvelope = {
    data: AddressCreateManyUserInput | AddressCreateManyUserInput[]
  }

  export type InteractionCreateWithoutUserInput = {
    id?: string
    type: string
    createdAt?: Date | string
    item: ItemCreateNestedOneWithoutInteractionsInput
  }

  export type InteractionUncheckedCreateWithoutUserInput = {
    id?: string
    itemId: string
    type: string
    createdAt?: Date | string
  }

  export type InteractionCreateOrConnectWithoutUserInput = {
    where: InteractionWhereUniqueInput
    create: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>
  }

  export type InteractionCreateManyUserInputEnvelope = {
    data: InteractionCreateManyUserInput | InteractionCreateManyUserInput[]
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    swapsCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    score?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    swapsCompleted?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpsertWithWhereUniqueWithoutUserInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutUserInput, ItemUncheckedUpdateWithoutUserInput>
    create: XOR<ItemCreateWithoutUserInput, ItemUncheckedCreateWithoutUserInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutUserInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutUserInput, ItemUncheckedUpdateWithoutUserInput>
  }

  export type ItemUpdateManyWithWhereWithoutUserInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutUserInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    id?: StringFilter<"Item"> | string
    userId?: StringFilter<"Item"> | string
    categoryId?: StringFilter<"Item"> | string
    title?: StringFilter<"Item"> | string
    description?: StringNullableFilter<"Item"> | string | null
    condition?: StringFilter<"Item"> | string
    estimatedValue?: FloatNullableFilter<"Item"> | number | null
    location?: StringNullableFilter<"Item"> | string | null
    status?: StringFilter<"Item"> | string
    isFeatured?: BoolFilter<"Item"> | boolean
    isPopular?: BoolFilter<"Item"> | boolean
    viewCount?: IntFilter<"Item"> | number
    qualityScore?: FloatFilter<"Item"> | number
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
  }

  export type TradeUpsertWithWhereUniqueWithoutSenderInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutSenderInput, TradeUncheckedUpdateWithoutSenderInput>
    create: XOR<TradeCreateWithoutSenderInput, TradeUncheckedCreateWithoutSenderInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutSenderInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutSenderInput, TradeUncheckedUpdateWithoutSenderInput>
  }

  export type TradeUpdateManyWithWhereWithoutSenderInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutSenderInput>
  }

  export type TradeScalarWhereInput = {
    AND?: TradeScalarWhereInput | TradeScalarWhereInput[]
    OR?: TradeScalarWhereInput[]
    NOT?: TradeScalarWhereInput | TradeScalarWhereInput[]
    id?: StringFilter<"Trade"> | string
    senderId?: StringFilter<"Trade"> | string
    receiverId?: StringFilter<"Trade"> | string
    status?: StringFilter<"Trade"> | string
    message?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type TradeUpsertWithWhereUniqueWithoutReceiverInput = {
    where: TradeWhereUniqueInput
    update: XOR<TradeUpdateWithoutReceiverInput, TradeUncheckedUpdateWithoutReceiverInput>
    create: XOR<TradeCreateWithoutReceiverInput, TradeUncheckedCreateWithoutReceiverInput>
  }

  export type TradeUpdateWithWhereUniqueWithoutReceiverInput = {
    where: TradeWhereUniqueInput
    data: XOR<TradeUpdateWithoutReceiverInput, TradeUncheckedUpdateWithoutReceiverInput>
  }

  export type TradeUpdateManyWithWhereWithoutReceiverInput = {
    where: TradeScalarWhereInput
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyWithoutReceiverInput>
  }

  export type FavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<FavoriteCreateWithoutUserInput, FavoriteUncheckedCreateWithoutUserInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutUserInput, FavoriteUncheckedUpdateWithoutUserInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutUserInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type FavoriteScalarWhereInput = {
    AND?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    OR?: FavoriteScalarWhereInput[]
    NOT?: FavoriteScalarWhereInput | FavoriteScalarWhereInput[]
    id?: StringFilter<"Favorite"> | string
    userId?: StringFilter<"Favorite"> | string
    itemId?: StringFilter<"Favorite"> | string
    createdAt?: DateTimeFilter<"Favorite"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    roomId?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    isRead?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageRoomUpsertWithWhereUniqueWithoutUser1Input = {
    where: MessageRoomWhereUniqueInput
    update: XOR<MessageRoomUpdateWithoutUser1Input, MessageRoomUncheckedUpdateWithoutUser1Input>
    create: XOR<MessageRoomCreateWithoutUser1Input, MessageRoomUncheckedCreateWithoutUser1Input>
  }

  export type MessageRoomUpdateWithWhereUniqueWithoutUser1Input = {
    where: MessageRoomWhereUniqueInput
    data: XOR<MessageRoomUpdateWithoutUser1Input, MessageRoomUncheckedUpdateWithoutUser1Input>
  }

  export type MessageRoomUpdateManyWithWhereWithoutUser1Input = {
    where: MessageRoomScalarWhereInput
    data: XOR<MessageRoomUpdateManyMutationInput, MessageRoomUncheckedUpdateManyWithoutUser1Input>
  }

  export type MessageRoomScalarWhereInput = {
    AND?: MessageRoomScalarWhereInput | MessageRoomScalarWhereInput[]
    OR?: MessageRoomScalarWhereInput[]
    NOT?: MessageRoomScalarWhereInput | MessageRoomScalarWhereInput[]
    id?: StringFilter<"MessageRoom"> | string
    user1Id?: StringFilter<"MessageRoom"> | string
    user2Id?: StringFilter<"MessageRoom"> | string
    createdAt?: DateTimeFilter<"MessageRoom"> | Date | string
    updatedAt?: DateTimeFilter<"MessageRoom"> | Date | string
  }

  export type MessageRoomUpsertWithWhereUniqueWithoutUser2Input = {
    where: MessageRoomWhereUniqueInput
    update: XOR<MessageRoomUpdateWithoutUser2Input, MessageRoomUncheckedUpdateWithoutUser2Input>
    create: XOR<MessageRoomCreateWithoutUser2Input, MessageRoomUncheckedCreateWithoutUser2Input>
  }

  export type MessageRoomUpdateWithWhereUniqueWithoutUser2Input = {
    where: MessageRoomWhereUniqueInput
    data: XOR<MessageRoomUpdateWithoutUser2Input, MessageRoomUncheckedUpdateWithoutUser2Input>
  }

  export type MessageRoomUpdateManyWithWhereWithoutUser2Input = {
    where: MessageRoomScalarWhereInput
    data: XOR<MessageRoomUpdateManyMutationInput, MessageRoomUncheckedUpdateManyWithoutUser2Input>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringNullableFilter<"Notification"> | string | null
    isRead?: BoolFilter<"Notification"> | boolean
    data?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type AddressUpsertWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    update: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
    create: XOR<AddressCreateWithoutUserInput, AddressUncheckedCreateWithoutUserInput>
  }

  export type AddressUpdateWithWhereUniqueWithoutUserInput = {
    where: AddressWhereUniqueInput
    data: XOR<AddressUpdateWithoutUserInput, AddressUncheckedUpdateWithoutUserInput>
  }

  export type AddressUpdateManyWithWhereWithoutUserInput = {
    where: AddressScalarWhereInput
    data: XOR<AddressUpdateManyMutationInput, AddressUncheckedUpdateManyWithoutUserInput>
  }

  export type AddressScalarWhereInput = {
    AND?: AddressScalarWhereInput | AddressScalarWhereInput[]
    OR?: AddressScalarWhereInput[]
    NOT?: AddressScalarWhereInput | AddressScalarWhereInput[]
    id?: StringFilter<"Address"> | string
    userId?: StringFilter<"Address"> | string
    title?: StringFilter<"Address"> | string
    address?: StringFilter<"Address"> | string
    city?: StringFilter<"Address"> | string
    type?: StringFilter<"Address"> | string
    isDefault?: BoolFilter<"Address"> | boolean
    createdAt?: DateTimeFilter<"Address"> | Date | string
    updatedAt?: DateTimeFilter<"Address"> | Date | string
  }

  export type InteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: InteractionWhereUniqueInput
    update: XOR<InteractionUpdateWithoutUserInput, InteractionUncheckedUpdateWithoutUserInput>
    create: XOR<InteractionCreateWithoutUserInput, InteractionUncheckedCreateWithoutUserInput>
  }

  export type InteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: InteractionWhereUniqueInput
    data: XOR<InteractionUpdateWithoutUserInput, InteractionUncheckedUpdateWithoutUserInput>
  }

  export type InteractionUpdateManyWithWhereWithoutUserInput = {
    where: InteractionScalarWhereInput
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type InteractionScalarWhereInput = {
    AND?: InteractionScalarWhereInput | InteractionScalarWhereInput[]
    OR?: InteractionScalarWhereInput[]
    NOT?: InteractionScalarWhereInput | InteractionScalarWhereInput[]
    id?: StringFilter<"Interaction"> | string
    userId?: StringFilter<"Interaction"> | string
    itemId?: StringFilter<"Interaction"> | string
    type?: StringFilter<"Interaction"> | string
    createdAt?: DateTimeFilter<"Interaction"> | Date | string
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    items?: ItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    items?: ItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    children?: CategoryCreateNestedManyWithoutParentInput
    items?: ItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    items?: ItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
  }

  export type ItemCreateWithoutCategoryInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutItemsInput
    images?: ItemImageCreateNestedManyWithoutItemInput
    favorites?: FavoriteCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemCreateNestedManyWithoutItemInput
    interactions?: InteractionCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutCategoryInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ItemImageUncheckedCreateNestedManyWithoutItemInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutItemInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutCategoryInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput>
  }

  export type ItemCreateManyCategoryInputEnvelope = {
    data: ItemCreateManyCategoryInput | ItemCreateManyCategoryInput[]
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    items?: ItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    icon?: StringNullableFilter<"Category"> | string | null
    description?: StringNullableFilter<"Category"> | string | null
    parentId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type ItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutCategoryInput, ItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<ItemCreateWithoutCategoryInput, ItemUncheckedCreateWithoutCategoryInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutCategoryInput, ItemUncheckedUpdateWithoutCategoryInput>
  }

  export type ItemUpdateManyWithWhereWithoutCategoryInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutItemsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutItemsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
  }

  export type CategoryCreateWithoutItemsInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
  }

  export type CategoryUncheckedCreateWithoutItemsInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    parentId?: string | null
    createdAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type CategoryCreateOrConnectWithoutItemsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
  }

  export type ItemImageCreateWithoutItemInput = {
    id?: string
    imageUrl: string
    isPrimary?: boolean
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ItemImageUncheckedCreateWithoutItemInput = {
    id?: string
    imageUrl: string
    isPrimary?: boolean
    displayOrder?: number
    createdAt?: Date | string
  }

  export type ItemImageCreateOrConnectWithoutItemInput = {
    where: ItemImageWhereUniqueInput
    create: XOR<ItemImageCreateWithoutItemInput, ItemImageUncheckedCreateWithoutItemInput>
  }

  export type ItemImageCreateManyItemInputEnvelope = {
    data: ItemImageCreateManyItemInput | ItemImageCreateManyItemInput[]
  }

  export type FavoriteCreateWithoutItemInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type FavoriteUncheckedCreateWithoutItemInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type FavoriteCreateOrConnectWithoutItemInput = {
    where: FavoriteWhereUniqueInput
    create: XOR<FavoriteCreateWithoutItemInput, FavoriteUncheckedCreateWithoutItemInput>
  }

  export type FavoriteCreateManyItemInputEnvelope = {
    data: FavoriteCreateManyItemInput | FavoriteCreateManyItemInput[]
  }

  export type TradeItemCreateWithoutItemInput = {
    id?: string
    side: string
    trade: TradeCreateNestedOneWithoutTradeItemsInput
  }

  export type TradeItemUncheckedCreateWithoutItemInput = {
    id?: string
    tradeId: string
    side: string
  }

  export type TradeItemCreateOrConnectWithoutItemInput = {
    where: TradeItemWhereUniqueInput
    create: XOR<TradeItemCreateWithoutItemInput, TradeItemUncheckedCreateWithoutItemInput>
  }

  export type TradeItemCreateManyItemInputEnvelope = {
    data: TradeItemCreateManyItemInput | TradeItemCreateManyItemInput[]
  }

  export type InteractionCreateWithoutItemInput = {
    id?: string
    type: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInteractionsInput
  }

  export type InteractionUncheckedCreateWithoutItemInput = {
    id?: string
    userId: string
    type: string
    createdAt?: Date | string
  }

  export type InteractionCreateOrConnectWithoutItemInput = {
    where: InteractionWhereUniqueInput
    create: XOR<InteractionCreateWithoutItemInput, InteractionUncheckedCreateWithoutItemInput>
  }

  export type InteractionCreateManyItemInputEnvelope = {
    data: InteractionCreateManyItemInput | InteractionCreateManyItemInput[]
  }

  export type UserUpsertWithoutItemsInput = {
    update: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
    create: XOR<UserCreateWithoutItemsInput, UserUncheckedCreateWithoutItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutItemsInput, UserUncheckedUpdateWithoutItemsInput>
  }

  export type UserUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutItemsInput = {
    update: XOR<CategoryUpdateWithoutItemsInput, CategoryUncheckedUpdateWithoutItemsInput>
    create: XOR<CategoryCreateWithoutItemsInput, CategoryUncheckedCreateWithoutItemsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutItemsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutItemsInput, CategoryUncheckedUpdateWithoutItemsInput>
  }

  export type CategoryUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
  }

  export type CategoryUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ItemImageUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemImageWhereUniqueInput
    update: XOR<ItemImageUpdateWithoutItemInput, ItemImageUncheckedUpdateWithoutItemInput>
    create: XOR<ItemImageCreateWithoutItemInput, ItemImageUncheckedCreateWithoutItemInput>
  }

  export type ItemImageUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemImageWhereUniqueInput
    data: XOR<ItemImageUpdateWithoutItemInput, ItemImageUncheckedUpdateWithoutItemInput>
  }

  export type ItemImageUpdateManyWithWhereWithoutItemInput = {
    where: ItemImageScalarWhereInput
    data: XOR<ItemImageUpdateManyMutationInput, ItemImageUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemImageScalarWhereInput = {
    AND?: ItemImageScalarWhereInput | ItemImageScalarWhereInput[]
    OR?: ItemImageScalarWhereInput[]
    NOT?: ItemImageScalarWhereInput | ItemImageScalarWhereInput[]
    id?: StringFilter<"ItemImage"> | string
    itemId?: StringFilter<"ItemImage"> | string
    imageUrl?: StringFilter<"ItemImage"> | string
    isPrimary?: BoolFilter<"ItemImage"> | boolean
    displayOrder?: IntFilter<"ItemImage"> | number
    createdAt?: DateTimeFilter<"ItemImage"> | Date | string
  }

  export type FavoriteUpsertWithWhereUniqueWithoutItemInput = {
    where: FavoriteWhereUniqueInput
    update: XOR<FavoriteUpdateWithoutItemInput, FavoriteUncheckedUpdateWithoutItemInput>
    create: XOR<FavoriteCreateWithoutItemInput, FavoriteUncheckedCreateWithoutItemInput>
  }

  export type FavoriteUpdateWithWhereUniqueWithoutItemInput = {
    where: FavoriteWhereUniqueInput
    data: XOR<FavoriteUpdateWithoutItemInput, FavoriteUncheckedUpdateWithoutItemInput>
  }

  export type FavoriteUpdateManyWithWhereWithoutItemInput = {
    where: FavoriteScalarWhereInput
    data: XOR<FavoriteUpdateManyMutationInput, FavoriteUncheckedUpdateManyWithoutItemInput>
  }

  export type TradeItemUpsertWithWhereUniqueWithoutItemInput = {
    where: TradeItemWhereUniqueInput
    update: XOR<TradeItemUpdateWithoutItemInput, TradeItemUncheckedUpdateWithoutItemInput>
    create: XOR<TradeItemCreateWithoutItemInput, TradeItemUncheckedCreateWithoutItemInput>
  }

  export type TradeItemUpdateWithWhereUniqueWithoutItemInput = {
    where: TradeItemWhereUniqueInput
    data: XOR<TradeItemUpdateWithoutItemInput, TradeItemUncheckedUpdateWithoutItemInput>
  }

  export type TradeItemUpdateManyWithWhereWithoutItemInput = {
    where: TradeItemScalarWhereInput
    data: XOR<TradeItemUpdateManyMutationInput, TradeItemUncheckedUpdateManyWithoutItemInput>
  }

  export type TradeItemScalarWhereInput = {
    AND?: TradeItemScalarWhereInput | TradeItemScalarWhereInput[]
    OR?: TradeItemScalarWhereInput[]
    NOT?: TradeItemScalarWhereInput | TradeItemScalarWhereInput[]
    id?: StringFilter<"TradeItem"> | string
    tradeId?: StringFilter<"TradeItem"> | string
    itemId?: StringFilter<"TradeItem"> | string
    side?: StringFilter<"TradeItem"> | string
  }

  export type InteractionUpsertWithWhereUniqueWithoutItemInput = {
    where: InteractionWhereUniqueInput
    update: XOR<InteractionUpdateWithoutItemInput, InteractionUncheckedUpdateWithoutItemInput>
    create: XOR<InteractionCreateWithoutItemInput, InteractionUncheckedCreateWithoutItemInput>
  }

  export type InteractionUpdateWithWhereUniqueWithoutItemInput = {
    where: InteractionWhereUniqueInput
    data: XOR<InteractionUpdateWithoutItemInput, InteractionUncheckedUpdateWithoutItemInput>
  }

  export type InteractionUpdateManyWithWhereWithoutItemInput = {
    where: InteractionScalarWhereInput
    data: XOR<InteractionUpdateManyMutationInput, InteractionUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemCreateWithoutImagesInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutItemsInput
    category: CategoryCreateNestedOneWithoutItemsInput
    favorites?: FavoriteCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemCreateNestedManyWithoutItemInput
    interactions?: InteractionCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutImagesInput = {
    id?: string
    userId: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    favorites?: FavoriteUncheckedCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutItemInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutImagesInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutImagesInput, ItemUncheckedCreateWithoutImagesInput>
  }

  export type ItemUpsertWithoutImagesInput = {
    update: XOR<ItemUpdateWithoutImagesInput, ItemUncheckedUpdateWithoutImagesInput>
    create: XOR<ItemCreateWithoutImagesInput, ItemUncheckedCreateWithoutImagesInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutImagesInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutImagesInput, ItemUncheckedUpdateWithoutImagesInput>
  }

  export type ItemUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    favorites?: FavoriteUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUpdateManyWithoutItemNestedInput
    interactions?: InteractionUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    favorites?: FavoriteUncheckedUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUncheckedUpdateManyWithoutItemNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UserCreateWithoutSentTradesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentTradesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentTradesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentTradesInput, UserUncheckedCreateWithoutSentTradesInput>
  }

  export type UserCreateWithoutReceivedTradesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedTradesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedTradesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedTradesInput, UserUncheckedCreateWithoutReceivedTradesInput>
  }

  export type TradeItemCreateWithoutTradeInput = {
    id?: string
    side: string
    item: ItemCreateNestedOneWithoutTradeItemsInput
  }

  export type TradeItemUncheckedCreateWithoutTradeInput = {
    id?: string
    itemId: string
    side: string
  }

  export type TradeItemCreateOrConnectWithoutTradeInput = {
    where: TradeItemWhereUniqueInput
    create: XOR<TradeItemCreateWithoutTradeInput, TradeItemUncheckedCreateWithoutTradeInput>
  }

  export type TradeItemCreateManyTradeInputEnvelope = {
    data: TradeItemCreateManyTradeInput | TradeItemCreateManyTradeInput[]
  }

  export type UserUpsertWithoutSentTradesInput = {
    update: XOR<UserUpdateWithoutSentTradesInput, UserUncheckedUpdateWithoutSentTradesInput>
    create: XOR<UserCreateWithoutSentTradesInput, UserUncheckedCreateWithoutSentTradesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentTradesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentTradesInput, UserUncheckedUpdateWithoutSentTradesInput>
  }

  export type UserUpdateWithoutSentTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceivedTradesInput = {
    update: XOR<UserUpdateWithoutReceivedTradesInput, UserUncheckedUpdateWithoutReceivedTradesInput>
    create: XOR<UserCreateWithoutReceivedTradesInput, UserUncheckedCreateWithoutReceivedTradesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedTradesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedTradesInput, UserUncheckedUpdateWithoutReceivedTradesInput>
  }

  export type UserUpdateWithoutReceivedTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedTradesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TradeItemUpsertWithWhereUniqueWithoutTradeInput = {
    where: TradeItemWhereUniqueInput
    update: XOR<TradeItemUpdateWithoutTradeInput, TradeItemUncheckedUpdateWithoutTradeInput>
    create: XOR<TradeItemCreateWithoutTradeInput, TradeItemUncheckedCreateWithoutTradeInput>
  }

  export type TradeItemUpdateWithWhereUniqueWithoutTradeInput = {
    where: TradeItemWhereUniqueInput
    data: XOR<TradeItemUpdateWithoutTradeInput, TradeItemUncheckedUpdateWithoutTradeInput>
  }

  export type TradeItemUpdateManyWithWhereWithoutTradeInput = {
    where: TradeItemScalarWhereInput
    data: XOR<TradeItemUpdateManyMutationInput, TradeItemUncheckedUpdateManyWithoutTradeInput>
  }

  export type TradeCreateWithoutTradeItemsInput = {
    id?: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sender: UserCreateNestedOneWithoutSentTradesInput
    receiver: UserCreateNestedOneWithoutReceivedTradesInput
  }

  export type TradeUncheckedCreateWithoutTradeItemsInput = {
    id?: string
    senderId: string
    receiverId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateOrConnectWithoutTradeItemsInput = {
    where: TradeWhereUniqueInput
    create: XOR<TradeCreateWithoutTradeItemsInput, TradeUncheckedCreateWithoutTradeItemsInput>
  }

  export type ItemCreateWithoutTradeItemsInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutItemsInput
    category: CategoryCreateNestedOneWithoutItemsInput
    images?: ItemImageCreateNestedManyWithoutItemInput
    favorites?: FavoriteCreateNestedManyWithoutItemInput
    interactions?: InteractionCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutTradeItemsInput = {
    id?: string
    userId: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ItemImageUncheckedCreateNestedManyWithoutItemInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutItemInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutTradeItemsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutTradeItemsInput, ItemUncheckedCreateWithoutTradeItemsInput>
  }

  export type TradeUpsertWithoutTradeItemsInput = {
    update: XOR<TradeUpdateWithoutTradeItemsInput, TradeUncheckedUpdateWithoutTradeItemsInput>
    create: XOR<TradeCreateWithoutTradeItemsInput, TradeUncheckedCreateWithoutTradeItemsInput>
    where?: TradeWhereInput
  }

  export type TradeUpdateToOneWithWhereWithoutTradeItemsInput = {
    where?: TradeWhereInput
    data: XOR<TradeUpdateWithoutTradeItemsInput, TradeUncheckedUpdateWithoutTradeItemsInput>
  }

  export type TradeUpdateWithoutTradeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentTradesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedTradesNestedInput
  }

  export type TradeUncheckedUpdateWithoutTradeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpsertWithoutTradeItemsInput = {
    update: XOR<ItemUpdateWithoutTradeItemsInput, ItemUncheckedUpdateWithoutTradeItemsInput>
    create: XOR<ItemCreateWithoutTradeItemsInput, ItemUncheckedCreateWithoutTradeItemsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutTradeItemsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutTradeItemsInput, ItemUncheckedUpdateWithoutTradeItemsInput>
  }

  export type ItemUpdateWithoutTradeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    images?: ItemImageUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUpdateManyWithoutItemNestedInput
    interactions?: InteractionUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutTradeItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ItemImageUncheckedUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutItemNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UserCreateWithoutFavoritesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type ItemCreateWithoutFavoritesInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutItemsInput
    category: CategoryCreateNestedOneWithoutItemsInput
    images?: ItemImageCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemCreateNestedManyWithoutItemInput
    interactions?: InteractionCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutFavoritesInput = {
    id?: string
    userId: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ItemImageUncheckedCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutItemInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutFavoritesInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemUpsertWithoutFavoritesInput = {
    update: XOR<ItemUpdateWithoutFavoritesInput, ItemUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutFavoritesInput, ItemUncheckedUpdateWithoutFavoritesInput>
  }

  export type ItemUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    images?: ItemImageUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUpdateManyWithoutItemNestedInput
    interactions?: InteractionUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ItemImageUncheckedUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUncheckedUpdateManyWithoutItemNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutItemNestedInput
  }

  export type UserCreateWithoutRooms1Input = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRooms1Input = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRooms1Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRooms1Input, UserUncheckedCreateWithoutRooms1Input>
  }

  export type UserCreateWithoutRooms2Input = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRooms2Input = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRooms2Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRooms2Input, UserUncheckedCreateWithoutRooms2Input>
  }

  export type MessageCreateWithoutRoomInput = {
    id?: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutRoomInput = {
    id?: string
    senderId: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutRoomInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageCreateManyRoomInputEnvelope = {
    data: MessageCreateManyRoomInput | MessageCreateManyRoomInput[]
  }

  export type UserUpsertWithoutRooms1Input = {
    update: XOR<UserUpdateWithoutRooms1Input, UserUncheckedUpdateWithoutRooms1Input>
    create: XOR<UserCreateWithoutRooms1Input, UserUncheckedCreateWithoutRooms1Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRooms1Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRooms1Input, UserUncheckedUpdateWithoutRooms1Input>
  }

  export type UserUpdateWithoutRooms1Input = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRooms1Input = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutRooms2Input = {
    update: XOR<UserUpdateWithoutRooms2Input, UserUncheckedUpdateWithoutRooms2Input>
    create: XOR<UserCreateWithoutRooms2Input, UserUncheckedCreateWithoutRooms2Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRooms2Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRooms2Input, UserUncheckedUpdateWithoutRooms2Input>
  }

  export type UserUpdateWithoutRooms2Input = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRooms2Input = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
    create: XOR<MessageCreateWithoutRoomInput, MessageUncheckedCreateWithoutRoomInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutRoomInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutRoomInput, MessageUncheckedUpdateWithoutRoomInput>
  }

  export type MessageUpdateManyWithWhereWithoutRoomInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutRoomInput>
  }

  export type MessageRoomCreateWithoutMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user1: UserCreateNestedOneWithoutRooms1Input
    user2: UserCreateNestedOneWithoutRooms2Input
  }

  export type MessageRoomUncheckedCreateWithoutMessagesInput = {
    id?: string
    user1Id: string
    user2Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageRoomCreateOrConnectWithoutMessagesInput = {
    where: MessageRoomWhereUniqueInput
    create: XOR<MessageRoomCreateWithoutMessagesInput, MessageRoomUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type MessageRoomUpsertWithoutMessagesInput = {
    update: XOR<MessageRoomUpdateWithoutMessagesInput, MessageRoomUncheckedUpdateWithoutMessagesInput>
    create: XOR<MessageRoomCreateWithoutMessagesInput, MessageRoomUncheckedCreateWithoutMessagesInput>
    where?: MessageRoomWhereInput
  }

  export type MessageRoomUpdateToOneWithWhereWithoutMessagesInput = {
    where?: MessageRoomWhereInput
    data: XOR<MessageRoomUpdateWithoutMessagesInput, MessageRoomUncheckedUpdateWithoutMessagesInput>
  }

  export type MessageRoomUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user1?: UserUpdateOneRequiredWithoutRooms1NestedInput
    user2?: UserUpdateOneRequiredWithoutRooms2NestedInput
  }

  export type MessageRoomUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    addresses?: AddressCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAddressesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    interactions?: InteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAddressesInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    interactions?: InteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAddressesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
  }

  export type UserUpsertWithoutAddressesInput = {
    update: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
    create: XOR<UserCreateWithoutAddressesInput, UserUncheckedCreateWithoutAddressesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAddressesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAddressesInput, UserUncheckedUpdateWithoutAddressesInput>
  }

  export type UserUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    interactions?: InteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAddressesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutInteractionsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileCreateNestedOneWithoutUserInput
    items?: ItemCreateNestedManyWithoutUserInput
    sentTrades?: TradeCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteCreateNestedManyWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomCreateNestedManyWithoutUser2Input
    notifications?: NotificationCreateNestedManyWithoutUserInput
    addresses?: AddressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInteractionsInput = {
    id?: string
    email: string
    passwordHash: string
    role?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    items?: ItemUncheckedCreateNestedManyWithoutUserInput
    sentTrades?: TradeUncheckedCreateNestedManyWithoutSenderInput
    receivedTrades?: TradeUncheckedCreateNestedManyWithoutReceiverInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    rooms1?: MessageRoomUncheckedCreateNestedManyWithoutUser1Input
    rooms2?: MessageRoomUncheckedCreateNestedManyWithoutUser2Input
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    addresses?: AddressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
  }

  export type ItemCreateWithoutInteractionsInput = {
    id?: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutItemsInput
    category: CategoryCreateNestedOneWithoutItemsInput
    images?: ItemImageCreateNestedManyWithoutItemInput
    favorites?: FavoriteCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutInteractionsInput = {
    id?: string
    userId: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    images?: ItemImageUncheckedCreateNestedManyWithoutItemInput
    favorites?: FavoriteUncheckedCreateNestedManyWithoutItemInput
    tradeItems?: TradeItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutInteractionsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutInteractionsInput, ItemUncheckedCreateWithoutInteractionsInput>
  }

  export type UserUpsertWithoutInteractionsInput = {
    update: XOR<UserUpdateWithoutInteractionsInput, UserUncheckedUpdateWithoutInteractionsInput>
    create: XOR<UserCreateWithoutInteractionsInput, UserUncheckedCreateWithoutInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInteractionsInput, UserUncheckedUpdateWithoutInteractionsInput>
  }

  export type UserUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUpdateOneWithoutUserNestedInput
    items?: ItemUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    addresses?: AddressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    items?: ItemUncheckedUpdateManyWithoutUserNestedInput
    sentTrades?: TradeUncheckedUpdateManyWithoutSenderNestedInput
    receivedTrades?: TradeUncheckedUpdateManyWithoutReceiverNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    rooms1?: MessageRoomUncheckedUpdateManyWithoutUser1NestedInput
    rooms2?: MessageRoomUncheckedUpdateManyWithoutUser2NestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    addresses?: AddressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemUpsertWithoutInteractionsInput = {
    update: XOR<ItemUpdateWithoutInteractionsInput, ItemUncheckedUpdateWithoutInteractionsInput>
    create: XOR<ItemCreateWithoutInteractionsInput, ItemUncheckedCreateWithoutInteractionsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutInteractionsInput, ItemUncheckedUpdateWithoutInteractionsInput>
  }

  export type ItemUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    images?: ItemImageUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ItemImageUncheckedUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyUserInput = {
    id?: string
    categoryId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateManySenderInput = {
    id?: string
    receiverId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeCreateManyReceiverInput = {
    id?: string
    senderId: string
    status?: string
    message?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FavoriteCreateManyUserInput = {
    id?: string
    itemId: string
    createdAt?: Date | string
  }

  export type MessageCreateManySenderInput = {
    id?: string
    roomId: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageRoomCreateManyUser1Input = {
    id?: string
    user2Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageRoomCreateManyUser2Input = {
    id?: string
    user1Id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: string
    title: string
    body?: string | null
    isRead?: boolean
    data?: string | null
    createdAt?: Date | string
  }

  export type AddressCreateManyUserInput = {
    id?: string
    title: string
    address: string
    city: string
    type?: string
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InteractionCreateManyUserInput = {
    id?: string
    itemId: string
    type: string
    createdAt?: Date | string
  }

  export type ItemUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutItemsNestedInput
    images?: ItemImageUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUpdateManyWithoutItemNestedInput
    interactions?: InteractionUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ItemImageUncheckedUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUncheckedUpdateManyWithoutItemNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedTradesNestedInput
    tradeItems?: TradeItemUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradeItems?: TradeItemUncheckedUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentTradesNestedInput
    tradeItems?: TradeItemUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tradeItems?: TradeItemUncheckedUpdateManyWithoutTradeNestedInput
  }

  export type TradeUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: MessageRoomUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRoomUpdateWithoutUser1Input = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user2?: UserUpdateOneRequiredWithoutRooms2NestedInput
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type MessageRoomUncheckedUpdateWithoutUser1Input = {
    id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type MessageRoomUncheckedUpdateManyWithoutUser1Input = {
    id?: StringFieldUpdateOperationsInput | string
    user2Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageRoomUpdateWithoutUser2Input = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user1?: UserUpdateOneRequiredWithoutRooms1NestedInput
    messages?: MessageUpdateManyWithoutRoomNestedInput
  }

  export type MessageRoomUncheckedUpdateWithoutUser2Input = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type MessageRoomUncheckedUpdateManyWithoutUser2Input = {
    id?: StringFieldUpdateOperationsInput | string
    user1Id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: NullableStringFieldUpdateOperationsInput | string | null
    isRead?: BoolFieldUpdateOperationsInput | boolean
    data?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AddressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type InteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyParentInput = {
    id?: string
    name: string
    slug: string
    icon?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type ItemCreateManyCategoryInput = {
    id?: string
    userId: string
    title: string
    description?: string | null
    condition?: string
    estimatedValue?: number | null
    location?: string | null
    status?: string
    isFeatured?: boolean
    isPopular?: boolean
    viewCount?: number
    qualityScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUpdateManyWithoutParentNestedInput
    items?: ItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    items?: ItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutItemsNestedInput
    images?: ItemImageUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUpdateManyWithoutItemNestedInput
    interactions?: InteractionUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ItemImageUncheckedUpdateManyWithoutItemNestedInput
    favorites?: FavoriteUncheckedUpdateManyWithoutItemNestedInput
    tradeItems?: TradeItemUncheckedUpdateManyWithoutItemNestedInput
    interactions?: InteractionUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    condition?: StringFieldUpdateOperationsInput | string
    estimatedValue?: NullableFloatFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isPopular?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    qualityScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemImageCreateManyItemInput = {
    id?: string
    imageUrl: string
    isPrimary?: boolean
    displayOrder?: number
    createdAt?: Date | string
  }

  export type FavoriteCreateManyItemInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type TradeItemCreateManyItemInput = {
    id?: string
    tradeId: string
    side: string
  }

  export type InteractionCreateManyItemInput = {
    id?: string
    userId: string
    type: string
    createdAt?: Date | string
  }

  export type ItemImageUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemImageUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemImageUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    displayOrder?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type FavoriteUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FavoriteUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeItemUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    trade?: TradeUpdateOneRequiredWithoutTradeItemsNestedInput
  }

  export type TradeItemUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type TradeItemUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    tradeId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type InteractionUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type InteractionUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InteractionUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeItemCreateManyTradeInput = {
    id?: string
    itemId: string
    side: string
  }

  export type TradeItemUpdateWithoutTradeInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
    item?: ItemUpdateOneRequiredWithoutTradeItemsNestedInput
  }

  export type TradeItemUncheckedUpdateWithoutTradeInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type TradeItemUncheckedUpdateManyWithoutTradeInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    side?: StringFieldUpdateOperationsInput | string
  }

  export type MessageCreateManyRoomInput = {
    id?: string
    senderId: string
    content: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemCountOutputTypeDefaultArgs instead
     */
    export type ItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradeCountOutputTypeDefaultArgs instead
     */
    export type TradeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageRoomCountOutputTypeDefaultArgs instead
     */
    export type MessageRoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageRoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProfileDefaultArgs instead
     */
    export type ProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProfileDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemDefaultArgs instead
     */
    export type ItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ItemImageDefaultArgs instead
     */
    export type ItemImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ItemImageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradeDefaultArgs instead
     */
    export type TradeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TradeItemDefaultArgs instead
     */
    export type TradeItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TradeItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FavoriteDefaultArgs instead
     */
    export type FavoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FavoriteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageRoomDefaultArgs instead
     */
    export type MessageRoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageRoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MessageDefaultArgs instead
     */
    export type MessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MessageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AddressDefaultArgs instead
     */
    export type AddressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AddressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InteractionDefaultArgs instead
     */
    export type InteractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InteractionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingDefaultArgs instead
     */
    export type SettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}