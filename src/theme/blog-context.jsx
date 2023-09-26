import { createContext, useContext } from "react";
import { isValidDate } from "./utils/date";

const BlogContext = createContext(null);

export const BlogProvider = ({ config, children, opts }) => {
  const { date } = opts.frontMatter;

  if (date && !isValidDate(date)) {
    throw new Error(
      `Invalid date "${date}". Provide date in "YYYY/M/D", "YYYY/M/D H:m", "YYYY-MM-DD", "[YYYY-MM-DD]T[HH:mm]" or "[YYYY-MM-DD]T[HH:mm:ss.SSS]Z" format.`
    );
  }
  return (
    <BlogContext.Provider value={{ config, opts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const value = useContext(BlogContext);
  if (!value) {
    throw new Error("useBlogContext must be used within a BlogProvider");
    }
  return value;
};
