// import { useAtom } from "jotai";
// import { branchtAtom } from "../../store";
// import cn from "../../utils/cn";
// import { StepNineOptions } from "../../utils/options";
// import { stepContainerStyles, subHeadingStyles } from "../../utils/styles";

// const StepNine = () => {
//   const [branch, setbranch] = useAtom(branchtAtom);
//   return (
//     <div className={cn(stepContainerStyles, "mb-4")}>
//       <h3 className={cn(subHeadingStyles, "mb-4 text-2xl")}>
//         יש לבחור סניף את הסניף הקרוב אליך:{" "}
//       </h3>
//       <div className="text-xl flex gap-4 mb-4 flex-wrap justify-center">
//         {StepNineOptions.map((option, index) => (
//           <span
//             key={index}
//             className={cn(
//               "w-36 md:w-52 px-2 py-4 rounded-lg bg-white border-themeBlue border-4 cursor-pointer text-lg md:text-3xl text-center",
//               {
//                 "bg-themeBlue text-white": branch === option,
//               }
//             )}
//             onClick={() => {
//               setbranch(option);
//             }}
//           >
//             {option}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StepNine;
