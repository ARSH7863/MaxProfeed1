import errorCodesToMsg from "./errorCodesToMsg";

function asyncHandler<Arguments>(handler: (args: Arguments) => Promise<any>) {
  return async (args: Arguments) => {
    try {
      return await handler(args);
    } catch (err: any) {
      return { error: errorCodesToMsg(err?.code) };
    }
  };
}

export default asyncHandler;
