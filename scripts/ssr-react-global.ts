// tsconfig uses "jsx": "preserve", so tsx compiles JSX the classic way and needs React in scope.
import React from "react";
(globalThis as any).React = React;
