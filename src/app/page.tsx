'use client';

import PokemonEntry from '@/components/PokemonEntry';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import * as PokemonApi from '@/network/pokemon-api';
import { Button, Col, Row, Spinner } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = parseInt(searchParams.get('page') || '1');

  const { data, error, isLoading } = useSWR(['getPokemonPage', page], () =>
    PokemonApi.getPokemonPage(page),
  );

  if (isLoading)
    return <Spinner animation="border" className="d-block m-auto" />;

  if (error)
    return (
      <div>
        <h1 className="text-center my-2">Failed to load data</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-center mb-4">Gotta cache &apos;em all</h1>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {data?.results.map((pokemonEntry) => (
          <Col key={pokemonEntry.name}>
            <PokemonEntry name={pokemonEntry.name} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.previous && (
          <Button
            onClick={() =>
              router.push(pathname + '?page=' + (page - 1).toString())
            }
          >
            Previous page
          </Button>
        )}
        {data?.next && (
          <Button
            onClick={() =>
              router.push(pathname + '?page=' + (page + 1).toString())
            }
          >
            Next page
          </Button>
        )}
      </div>
    </div>
  );
}
