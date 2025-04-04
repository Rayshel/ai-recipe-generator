import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

function App({ signOut, user }) {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setRecipe('');
    
    try {
      const response = await fetch('https://pwf79xinr8.execute-api.us-west-1.amazonaws.com/dev/generate-recipe', {
        method: 'POST',
        body: JSON.stringify({ ingredients }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setRecipe('Failed to generate recipe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h2>Welcome, {user.username}</h2>
        <button onClick={signOut}>Sign Out</button>
      </header>

      <main>
        <h1>AI Recipe Generator</h1>
        <textarea
          placeholder="Enter ingredients (e.g., chicken, rice, broccoli)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleGenerateRecipe} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>

        {recipe && (
          <div className="recipe">
            <h3>Your Recipe:</h3>
            <pre>{recipe}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default withAuthenticator(App);
