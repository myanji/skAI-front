const useCalculateGrade = () => {
  const calculate = (birthday) => {
    if (!birthday) return "학년 정보 없음";

    const birthYear = parseInt(birthday.split("-")[0], 10);
    const currentYear = new Date().getFullYear();
    const grade = currentYear - birthYear - 7 + 1;

    if (grade < 1) return "미취학 아동";
    if (grade > 6) return "초등학교 졸업";
    return `초등학교 ${grade}학년`;
  };

  return calculate;
};

export default useCalculateGrade;
