import { useOutletContext } from "react-router-dom";

import { type Post } from "../App";

export function usePost() {
  return useOutletContext<Post>();
}
