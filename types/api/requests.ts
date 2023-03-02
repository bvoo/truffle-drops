export type DropRequest = {
  name: string;
  image: string;
  duration: number;
  quantity: number;
  remaining: number;
  webhook: string;
};

export function validateDropRequest(req: DropRequest): boolean {
  // Check that all required fields are present
  if (!req?.name || !req?.image || !req?.duration || !req?.quantity || !req?.remaining || !req?.webhook) {
    return false;
  }

  // Check that all fields have the correct type
  if (
    typeof req.name !== 'string' ||
    typeof req.image !== 'string' ||
    typeof req.duration !== 'number' ||
    typeof req.quantity !== 'number' ||
    typeof req.remaining !== 'number' ||
    typeof req.webhook !== 'string'
  ) {
    return false;
  }

  // Check that the name field is a non-empty string with at least 3 non-whitespace characters
  if (req.name.trim().length < 3) {
    return false;
  }

  // Check that the image field is a valid URL
  try {
    new URL(req.image);
  } catch (e) {
    return false;
  }

  // Check that the name, webhook and image fields are between 3 and 128 characters long
  if (req.name.length > 512 || req.image.length > 512 || req.webhook.length > 512) {
    return false;
  }

  // Check that remaining is not greater than quantity
  if (req.remaining > req.quantity) {
    return false;
  }

  // Check that numeric fields are positive
  if (req.duration <= 0 || req.quantity <= 0 || req.remaining < 0) {
    return false;
  }

  // Check that the webhook is a valid URL
  try {
    new URL(req.webhook);
  } catch (e) {
    return false;
  }

  // All checks passed, so the request is valid
  return true;
}

export type UserRequest = {
  id: string;
  name: string;
  image: string | null;
};
