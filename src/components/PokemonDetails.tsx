'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Form, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import usePokemon from '@/hooks/usePokemon';
import * as PokemonApi from '@/network/pokemon-api';

export default function PokemonDetails() {
  const params = useParams();

  const pokemonName = params.pokemon as string;

  const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

  async function handleSubmitNickName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const nickName = formData.get('nickname')?.toString().trim();
    if (!pokemon || !nickName) return;

    const update = await PokemonApi.setNickName(pokemon, nickName);

    mutatePokemon(update, {
      revalidate: false,
    });
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <p>
        <Link href="/" className="link-light">
          ← PokéDex
        </Link>
      </p>
      {pokemonLoading && <Spinner animation="grow" />}
      {pokemon === null && <p>Pokemon not found</p>}
      {pokemon && (
        <>
          <h1 className="text-center text-capitalize">{pokemon.name}</h1>
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={'Pokemon: ' + pokemon.name}
            width={400}
            height={400}
          />
          <div className="d-inline-block mt-2">
            <div>
              <strong>Types:</strong>{' '}
              {pokemon.types.map((type) => type.type.name).join(', ')}
            </div>
            <div>
              <strong>Height:</strong> {pokemon.height * 10} cm
            </div>
            <div>
              <strong>Weight:</strong> {pokemon.weight / 10} kg
            </div>
          </div>
          <Form onSubmit={handleSubmitNickName} className="mt-4">
            <Form.Group controlId="pokemon-nickname-input" className="mb-3">
              <Form.Label>Give this Pokemon a nickname</Form.Label>
              <Form.Control
                name="nickname"
                type="text"
                placeholder="E.g Ferdinand"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Set Nickname
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
