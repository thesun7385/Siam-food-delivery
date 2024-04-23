import MealItem from "./MealItem.jsx";
import UseHttp from "../hooks/useHttp.js";
// import Error from "./Error.jsx";

const requestConfig = {};

// Meals conponent
export default function meals() {
  // Fetch the meals data
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = UseHttp("http://localhost:3000/meals", requestConfig, []);

  // Fetching meals
  if (isLoading) {
    return <p className="fetching-message">Fetching meals...</p>;
  }

  if (error) {
    return <p>Failed to fetch meals</p>;
  }

  return (
    //-- Menu --
    <section class="menu section bd-container" id="menu">
      <span class="section-subtitle"></span>
      <h2 class="section-title">Menu</h2>
      <ul id="meals">
        {/* -- List -- */}
        <div class="menu-container bd-grid">
          {loadedMeals.map((meal) => (
            // MealItem component
            <MealItem key={meal.id} meal={meal} />
          ))}
        </div>
      </ul>
    </section>
  );
}
