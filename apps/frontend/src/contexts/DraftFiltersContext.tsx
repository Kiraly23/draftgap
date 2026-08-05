import {
    JSXElement,
    batch,
    createContext,
    createSignal,
    onMount,
    useContext,
} from "solid-js";
import { Role } from "@draftgap/core/src/models/Role";

const DEFAULT_ROLE_FILTER: Role | undefined = Role.Top;

export function createDraftFiltersContext() {
    const [search, setSearch] = createSignal("");
    const [roleFilter, setRoleFilter] = createSignal<Role | undefined>();

    const [favouriteFilter, setFavouriteFilter] = createSignal(false);

    onMount(() => setRoleFilter(DEFAULT_ROLE_FILTER));

    function resetDraftFilters() {
        batch(() => {
            setSearch("");
            setRoleFilter(DEFAULT_ROLE_FILTER);
            setFavouriteFilter(false);
        });
    }

    return {
        search,
        setSearch,
        roleFilter,
        setRoleFilter,
        favouriteFilter,
        setFavouriteFilter,
        resetDraftFilters,
    };
}

export const DraftFiltersContext =
    createContext<ReturnType<typeof createDraftFiltersContext>>(undefined);

export function DraftFiltersProvider(props: { children: JSXElement }) {
    const ctx = createDraftFiltersContext();

    return (
        <DraftFiltersContext.Provider value={ctx}>
            {props.children}
        </DraftFiltersContext.Provider>
    );
}

export function useDraftFilters() {
    const useCtx = useContext(DraftFiltersContext);
    if (!useCtx) throw new Error("No DraftFiltersContext found");

    return useCtx;
}
