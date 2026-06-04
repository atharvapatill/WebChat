function HomeScreen() {
  return (
    <div
      className="
        w-full
        h-full
        flex
        items-center
        justify-center
        bg-zinc-900
        border
        border-zinc-700
        rounded-2xl
        overflow-hidden
        relative
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          w-72
          h-72
          bg-blue-500/10
          blur-3xl
          rounded-full
        "
      ></div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          text-center
          gap-5
          px-6
        "
      >
        {/* Icon */}
        <div
          className="
            w-20
            h-20
            rounded-3xl
            bg-zinc-800
            border
            border-zinc-700
            flex
            items-center
            justify-center
            text-4xl
            shadow-lg
          "
        >
          💬
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome to WebChat
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;