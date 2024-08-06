import PokemonDetails from '../../components/PokemonDetails';
import { Metadata } from 'next';

type PokemonDetailsPageProps = {
  params: {
    pokemon: string;
  };
};

export async function generateMetadata({
  params,
}: PokemonDetailsPageProps): Promise<Metadata> {
  return {
    title: `${params.pokemon} - NextJS PokéDex`,
  };
}

export default function PokemonPage() {
  return (
    <>
      <PokemonDetails />
    </>
  );
}
