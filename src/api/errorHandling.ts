export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error("Error: ", { error });
    return error.message;
  }
  console.error("Unknown error: ", { error });
  return "An unknown error occurred";
}
